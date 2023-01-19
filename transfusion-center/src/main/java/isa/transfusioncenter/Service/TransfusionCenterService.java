package isa.transfusioncenter.Service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import isa.transfusioncenter.Model.TransfusionCenter;
import isa.transfusioncenter.Repository.TransfusionCenterRepository;

@Service
public class TransfusionCenterService {

    private final TransfusionCenterRepository transfusionCenterRepository;

    @Autowired
    public TransfusionCenterService(TransfusionCenterRepository transfusionCenterRepository) {
        this.transfusionCenterRepository = transfusionCenterRepository;
    }

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
