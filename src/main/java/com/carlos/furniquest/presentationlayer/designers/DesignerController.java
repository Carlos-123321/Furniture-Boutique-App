package com.carlos.furniquest.presentationlayer.designers;

import com.carlos.furniquest.businesslayer.DesignerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/designers")

public class DesignerController {

    private DesignerService designerService;

    public DesignerController(DesignerService designerService) {

        this.designerService = designerService;
    }


    @GetMapping()
    public List<DesignerResponseDTO> getDesigner(){

        return designerService.getAllDesigners();
    }


    @GetMapping("/{designerId}")
    public DesignerResponseDTO getDesignerByDesignerId(@PathVariable String designerId){

        return designerService.getOneDesigner(designerId);
    }

    @PostMapping()

    public DesignerResponseDTO addDesigner(@RequestBody DesignerRequestDTO designerRequestDTO){

        return designerService.addDesigner(designerRequestDTO);
    }

    @PutMapping("/{designerId}")

    public DesignerResponseDTO updateDesigner(@RequestBody DesignerRequestDTO designerRequestDTO,
                                              @PathVariable String designerId){

        return designerService.updateDesigner(designerRequestDTO, designerId);
    }

    @DeleteMapping("/{designerId}")

    public void deleteDesignerByDesignerId(@PathVariable String designerId){

        designerService.deleteDesignerByDesignerId(designerId);
    }
}
