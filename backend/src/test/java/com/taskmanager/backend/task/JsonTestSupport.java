package com.taskmanager.backend.task;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

final class JsonTestSupport {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private JsonTestSupport() {
    }

    static String extractString(String json, String fieldName) throws Exception {
        JsonNode node = OBJECT_MAPPER.readTree(json);
        return node.get(fieldName).asText();
    }
}
