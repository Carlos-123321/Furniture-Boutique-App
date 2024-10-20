package com.carlos.furniquest.presentationlayer.furniture;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class FurnitureRequestDTO {

    private String name;
    private BigDecimal price;
    private String material;
    private String imageURL;
    private String designerId;
}
