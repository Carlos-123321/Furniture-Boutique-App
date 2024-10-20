package com.carlos.furniquest.presentationlayer.furniture;

import com.carlos.furniquest.businesslayer.FurnitureService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/furniture")

public class FurnitureController {

    private FurnitureService furnitureService;

    public FurnitureController(FurnitureService furnitureService) {

        this.furnitureService = furnitureService;
    }


    @GetMapping()

    public List<FurnitureResponseDTO> getFurniture(){

        return furnitureService.getAllFurniture();
    }


    @GetMapping("/{furnitureId}")

    public ResponseEntity<FurnitureResponseDTO> getFurnitureByFurnitureId(@PathVariable String furnitureId){

        return ResponseEntity.status(HttpStatus.OK).body(furnitureService.getOneFurniture(furnitureId));
    }


    @PostMapping()

    public ResponseEntity<FurnitureResponseDTO> addFurniture(@RequestBody FurnitureRequestDTO furnitureRequestDTO){

        return ResponseEntity.status(HttpStatus.CREATED).body(furnitureService.addFurniture(furnitureRequestDTO));
    }


    @PutMapping("/{furnitureId}")

    public FurnitureResponseDTO updateFurniture(@RequestBody FurnitureRequestDTO furnitureRequestDTO,
                                        @PathVariable String furnitureId){

        return furnitureService.updateFurniture(furnitureRequestDTO, furnitureId);
    }


    @DeleteMapping("/{furnitureId}")

    public ResponseEntity<Void> deleteFurniture(@PathVariable String furnitureId){

        furnitureService.deleteFurniture(furnitureId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}