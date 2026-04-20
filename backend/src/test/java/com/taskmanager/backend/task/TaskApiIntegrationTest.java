package com.taskmanager.backend.task;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class TaskApiIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getTasksReturnsEmptyListWhenNoTasksExist() throws Exception {
        mockMvc.perform(get("/api/tasks"))
            .andExpect(status().isOk())
            .andExpect(content().json("[]"));
    }

    @Test
    void postTaskCreatesTaskWithPendingStatus() throws Exception {
        mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "title": "Prepare sprint review"
                    }
                    """))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").isNotEmpty())
            .andExpect(jsonPath("$.title").value("Prepare sprint review"))
            .andExpect(jsonPath("$.status").value("PENDING"));
    }

    @Test
    void putTaskUpdatesTitleAndStatus() throws Exception {
        var createResponse = mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "title": "Draft report"
                    }
                    """))
            .andExpect(status().isCreated())
            .andReturn()
            .getResponse()
            .getContentAsString();

        var id = JsonTestSupport.extractString(createResponse, "id");

        mockMvc.perform(put("/api/tasks/{id}", id)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "title": "Draft final report",
                      "status": "COMPLETED"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(id))
            .andExpect(jsonPath("$.title").value("Draft final report"))
            .andExpect(jsonPath("$.status").value("COMPLETED"));
    }

    @Test
    void deleteTaskRemovesTaskFromSubsequentReads() throws Exception {
        var createResponse = mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "title": "Remove me"
                    }
                    """))
            .andExpect(status().isCreated())
            .andReturn()
            .getResponse()
            .getContentAsString();

        var id = JsonTestSupport.extractString(createResponse, "id");

        mockMvc.perform(delete("/api/tasks/{id}", id))
            .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/tasks"))
            .andExpect(status().isOk())
            .andExpect(content().json("[]"));
    }

    @Test
    void postTaskRejectsBlankTitle() throws Exception {
        mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "title": "   "
                    }
                    """))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.message").value("Task title is required."));
    }

    @Test
    void putTaskReturnsNotFoundWhenTaskDoesNotExist() throws Exception {
        mockMvc.perform(put("/api/tasks/{id}", "missing-task")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "title": "Unknown task",
                      "status": "PENDING"
                    }
                    """))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.message").value("Task missing-task was not found."));
    }

    @Test
    void deleteTaskReturnsNotFoundWhenTaskDoesNotExist() throws Exception {
        mockMvc.perform(delete("/api/tasks/{id}", "missing-task"))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.message").value("Task missing-task was not found."));
    }
}
