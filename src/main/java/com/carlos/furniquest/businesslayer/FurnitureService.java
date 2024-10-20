package com.carlos.furniquest.businesslayer;

import com.carlos.furniquest.presentationlayer.furniture.FurnitureRequestDTO;
import com.carlos.furniquest.presentationlayer.furniture.FurnitureResponseDTO;

import java.util.List;

public interface FurnitureService {

    List<FurnitureResponseDTO> getAllFurniture();

    FurnitureResponseDTO getOneFurniture(String furnitureId);

    FurnitureResponseDTO addFurniture(FurnitureRequestDTO furnitureRequestDTO);

    FurnitureResponseDTO updateFurniture(FurnitureRequestDTO furnitureRequestDTO, String furnitureId);

    void deleteFurniture(String furnitureId);

}
