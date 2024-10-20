package com.carlos.furniquest.presentationlayer.furniture;

import com.carlos.furniquest.presentationlayer.designers.DesignerResponseDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor

public class FurnitureResponseDTO {

    private String furnitureId;
    private String name;
    private BigDecimal price;
    private String material;
    private String imageURL;
    private DesignerResponseDTO designer;
}
