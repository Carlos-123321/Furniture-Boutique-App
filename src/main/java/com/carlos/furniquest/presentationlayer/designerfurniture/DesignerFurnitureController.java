package com.carlos.furniquest.presentationlayer.designerfurniture;

import com.carlos.furniquest.businesslayer.DesignerFurnitureService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/designers/{designerId}/furniture")
public class DesignerFurnitureController {

    private DesignerFurnitureService designerFurnitureService;

    public DesignerFurnitureController(DesignerFurnitureService designerFurnitureService) {
        this.designerFurnitureService = designerFurnitureService;
    }

    @GetMapping
    public DesignerFurnitureResponseDTO getAllFurnitureForADesigner(@PathVariable String designerId){

        return designerFurnitureService.getAllFurnitureByDesignerId(designerId);
    }



}
