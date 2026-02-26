package com.example.demo.controller;

import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/google")
public class GoogleContactController {

    @GetMapping("/contacts")
    public Map<String, Object> getGoogleContacts(@RegisteredOAuth2AuthorizedClient("google") OAuth2AuthorizedClient client) {
        String token = client.getAccessToken().getTokenValue();
        
        String url = "https://people.googleapis.com/v1/people/me/connections" + 
                     "?personFields=names,emailAddresses&pageSize=50";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        
        HttpEntity<String> entity = new HttpEntity<>(headers);

        return restTemplate.exchange(url, HttpMethod.GET, entity, Map.class).getBody();
    }
}