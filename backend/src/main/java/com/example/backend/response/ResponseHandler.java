package com.example.backend.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {
    public static ResponseEntity<Object> generateResponse(Long count, HttpStatus status, Object data) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("count", count);
        map.put("data", data);
        return new ResponseEntity<>(map, status);
    }
}
