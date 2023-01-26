package isa.transfusioncenter.controller;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import isa.transfusioncenter.model.TransfusionCenter;
import isa.transfusioncenter.service.TransfusionCenterService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping(value = "/api/transfusionCenters", produces = MediaType.APPLICATION_JSON_VALUE)
public class TransfusionCenterController {
    private final TransfusionCenterService transfusionCenterService;

    @GetMapping
    public ResponseEntity<?> getAllCenters() {
        try {
            return new ResponseEntity<ArrayList<TransfusionCenter>>(transfusionCenterService.findAll(), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
