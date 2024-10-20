package com.carlos.furniquest.businesslayer;

import com.carlos.furniquest.dataaccesslayer.Designer;
import com.carlos.furniquest.dataaccesslayer.DesignerRepository;
import com.carlos.furniquest.dataaccesslayer.Furniture;
import com.carlos.furniquest.dataaccesslayer.FurnitureRepository;
import com.carlos.furniquest.presentationlayer.designerfurniture.DesignerFurnitureResponseDTO;
import com.carlos.furniquest.presentationlayer.designers.DesignerResponseDTO;
import com.carlos.furniquest.presentationlayer.furniture.FurnitureResponseDTO;
import com.carlos.furniquest.utils.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DesignerFurnitureServiceImpl implements DesignerFurnitureService{


    private DesignerRepository designerRepository;
    private FurnitureRepository furnitureRepository;

    public DesignerFurnitureServiceImpl(DesignerRepository designerRepository, FurnitureRepository furnitureRepository) {
        this.designerRepository = designerRepository;
        this.furnitureRepository = furnitureRepository;
    }

    @Override
    public DesignerFurnitureResponseDTO getAllFurnitureByDesignerId(String designerId) {
        Designer foundDesigner = designerRepository.findDesignerByDesignerId(designerId);

        if(foundDesigner == null){
            throw new NotFoundException("Unknown designer id: " + designerId);

        }

        DesignerFurnitureResponseDTO designerFurnitureResponseDTO = new DesignerFurnitureResponseDTO();
        BeanUtils.copyProperties(foundDesigner, designerFurnitureResponseDTO);

        List<Furniture> furnitureList = furnitureRepository.findFurnitureByDesigner_DesignerId(designerId);

        List<FurnitureResponseDTO> furnitureResponseDTOList = new ArrayList<>();

        for(Furniture furniture: furnitureList){

            FurnitureResponseDTO furnitureResponseDTO = new FurnitureResponseDTO();
            BeanUtils.copyProperties(furniture, furnitureResponseDTO);

            DesignerResponseDTO designerResponseDTO = new DesignerResponseDTO();
            BeanUtils.copyProperties(furniture.getDesigner(), designerResponseDTO);
            furnitureResponseDTO.setDesigner(designerResponseDTO);
            furnitureResponseDTOList.add(furnitureResponseDTO);
        }

        designerFurnitureResponseDTO.setFurniture(furnitureResponseDTOList);

        return designerFurnitureResponseDTO;
    }
}

