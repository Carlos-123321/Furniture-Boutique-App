package com.carlos.furniquest.businesslayer;

import com.carlos.furniquest.presentationlayer.designerfurniture.DesignerFurnitureResponseDTO;

public interface DesignerFurnitureService {

    DesignerFurnitureResponseDTO getAllFurnitureByDesignerId(String designerId);


}
