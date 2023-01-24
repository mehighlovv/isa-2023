package isa.transfusioncenter.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import isa.transfusioncenter.model.TransfusionCenter;
import isa.transfusioncenter.repository.TransfusionCenterRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransfusionCenterService {

    private final TransfusionCenterRepository transfusionCenterRepository;

    public ArrayList<TransfusionCenter> findAll() {
        return transfusionCenterRepository.findAll();
    }

    public TransfusionCenter createTransfusionCenter(TransfusionCenter transfusionCenter) {
        return this.transfusionCenterRepository.save(transfusionCenter);
    }

    public void deleteTransfusionCenter(Long id) {
        this.transfusionCenterRepository.deleteById(id);
    }

}
