package com.carlos.furniquest.presentationlayer.designerfurniture;

import com.carlos.furniquest.presentationlayer.furniture.FurnitureResponseDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class DesignerFurnitureResponseDTO {

    private String designerId;
    private String name;
    private LocalDate dob;
    private String country;
    private String KimageURL;
    private List<FurnitureResponseDTO> furniture;

}
