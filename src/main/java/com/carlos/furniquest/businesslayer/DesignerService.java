package com.carlos.furniquest.businesslayer;

import com.carlos.furniquest.presentationlayer.designers.DesignerRequestDTO;
import com.carlos.furniquest.presentationlayer.designers.DesignerResponseDTO;

import java.util.List;

public interface DesignerService {

    List<DesignerResponseDTO> getAllDesigners();

    DesignerResponseDTO getOneDesigner(String designerId);

    DesignerResponseDTO addDesigner(DesignerRequestDTO designerRequestDTO);



    DesignerResponseDTO updateDesigner(DesignerRequestDTO designerRequestDTO, String designerId);

    void deleteDesignerByDesignerId(String designerId);

}