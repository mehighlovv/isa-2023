package isa.transfusioncenter.Controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import isa.transfusioncenter.Model.TransfusionCenter;
import isa.transfusioncenter.Service.TransfusionCenterService;

@Controller
public class TransfusionCenterController {
    private final TransfusionCenterService transfusionCenterService;

    @Autowired
    public TransfusionCenterController(TransfusionCenterService transfusionCenterService) {
        this.transfusionCenterService = transfusionCenterService;
    }

    @GetMapping(path = "/transfusionCenters")
    public ResponseEntity<?> getAllCenters() {
        try {
            return new ResponseEntity<ArrayList<TransfusionCenter>>(transfusionCenterService.findAll(), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
