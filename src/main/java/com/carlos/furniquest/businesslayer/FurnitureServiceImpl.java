package com.carlos.furniquest.businesslayer;

import com.carlos.furniquest.dataaccesslayer.Designer;
import com.carlos.furniquest.dataaccesslayer.DesignerRepository;
import com.carlos.furniquest.dataaccesslayer.Furniture;
import com.carlos.furniquest.dataaccesslayer.FurnitureRepository;
import com.carlos.furniquest.presentationlayer.designers.DesignerResponseDTO;
import com.carlos.furniquest.presentationlayer.furniture.FurnitureRequestDTO;
import com.carlos.furniquest.presentationlayer.furniture.FurnitureResponseDTO;
import com.carlos.furniquest.utils.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service

public class FurnitureServiceImpl implements FurnitureService {

    private FurnitureRepository furnitureRepository;
    private DesignerRepository designerRepository;

    public FurnitureServiceImpl(FurnitureRepository furnitureRepository, DesignerRepository designerRepository) {

        this.furnitureRepository = furnitureRepository;
        this.designerRepository = designerRepository;
    }

    @Override
    public List<FurnitureResponseDTO> getAllFurniture() {

        List<Furniture> furnitureEntities = furnitureRepository.findAll();
        //convert list of movie entities to list of MovieResponseDTO

        List<FurnitureResponseDTO> furnitureResponseDTOList = new ArrayList<>();

        for (Furniture furniture : furnitureEntities) {
            FurnitureResponseDTO furnitureResponseDTO = new FurnitureResponseDTO();
            BeanUtils.copyProperties(furniture, furnitureResponseDTO);

            DesignerResponseDTO designerResponseDTO = new DesignerResponseDTO();
            BeanUtils.copyProperties(furniture.getDesigner(), designerResponseDTO);
            furnitureResponseDTO.setDesigner(designerResponseDTO);

            furnitureResponseDTOList.add(furnitureResponseDTO);
        }

        return furnitureResponseDTOList;
    }

    @Override
    public FurnitureResponseDTO getOneFurniture(String furnitureId) {

        Furniture furniture = furnitureRepository.findFurnitureByFurnitureId(furnitureId);

        if (furniture == null) {
            throw new NotFoundException("Unknown furnitureId: " + furnitureId);
        }

        FurnitureResponseDTO furnitureResponseDTO = new FurnitureResponseDTO();
        BeanUtils.copyProperties(furniture, furnitureResponseDTO);

        DesignerResponseDTO designerResponseDTO = new DesignerResponseDTO();
        BeanUtils.copyProperties(furniture.getDesigner(), designerResponseDTO);
        furnitureResponseDTO.setDesigner(designerResponseDTO);

        return furnitureResponseDTO;
    }

    @Override
    public FurnitureResponseDTO addFurniture(FurnitureRequestDTO furnitureRequestDTO) {

        //find director by provided directorId
        Designer foundDesigner = designerRepository.findDesignerByDesignerId(furnitureRequestDTO.getDesignerId());

        if (foundDesigner == null) {
            throw new NotFoundException("Unknown designerId: " + furnitureRequestDTO.getDesignerId());
        }

        //Convert movieReqeustDTO to an Entity
        Furniture furniture = new Furniture();
        BeanUtils.copyProperties(furnitureRequestDTO, furniture);
        furniture.setFurnitureId(UUID.randomUUID().toString());
        //add the director
        furniture.setDesigner(foundDesigner);

        //save movie entity to database via repository
        Furniture savedFurniture = furnitureRepository.save(furniture);

        //convert savedMovie(entity) to MovieResponseDTO
        FurnitureResponseDTO furnitureResponseDTO = new FurnitureResponseDTO();
        BeanUtils.copyProperties(savedFurniture, furnitureResponseDTO);
        DesignerResponseDTO designerResponseDTO = new DesignerResponseDTO();
        BeanUtils.copyProperties(savedFurniture.getDesigner(), designerResponseDTO);

        furnitureResponseDTO.setDesigner(designerResponseDTO);

        return furnitureResponseDTO;
    }

    @Override
    public FurnitureResponseDTO updateFurniture(FurnitureRequestDTO furnitureRequestDTO, String furnitureId) {

        Furniture foundFurniture = furnitureRepository.findFurnitureByFurnitureId(furnitureId);

        if (foundFurniture == null) {
            throw new NotFoundException("Unknown furnitureId: " + furnitureId);
        }

        Designer foundDesigner = designerRepository.findDesignerByDesignerId(furnitureRequestDTO.getDesignerId());

        if (foundDesigner == null) {
            throw new NotFoundException("Unknown designerId: " + furnitureRequestDTO.getDesignerId());
        }

        //Convert movieReqeustDTO to an Entity
        Furniture furniture = new Furniture();
        BeanUtils.copyProperties(furnitureRequestDTO, furniture);

        //we need to keep these 2
        furniture.setFurnitureId(foundFurniture.getFurnitureId());
        furniture.setId(foundFurniture.getId());

        furniture.setDesigner(foundDesigner);
        //save movie entity to movie repository
        Furniture savedFurniture = furnitureRepository.save(furniture);

        //convert savedMovie(entity) to MovieResponseDTO
        FurnitureResponseDTO furnitureResponseDTO = new FurnitureResponseDTO();
        BeanUtils.copyProperties(savedFurniture, furnitureResponseDTO);

        DesignerResponseDTO designerResponseDTO = new DesignerResponseDTO();
        BeanUtils.copyProperties(savedFurniture.getDesigner(), designerResponseDTO);

        furnitureResponseDTO.setDesigner(designerResponseDTO);


        return furnitureResponseDTO;
    }

    @Override
    public void deleteFurniture(String furnitureId) {
        Furniture foundFurniture = furnitureRepository.findFurnitureByFurnitureId(furnitureId);

        if (foundFurniture == null) {
            throw new NotFoundException("Unknown furnitureId: " + furnitureId);
        }
        furnitureRepository.delete(foundFurniture);
    }
}