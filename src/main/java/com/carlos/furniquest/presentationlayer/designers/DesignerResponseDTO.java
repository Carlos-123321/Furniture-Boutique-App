package com.carlos.furniquest.presentationlayer.designers;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor

public class DesignerResponseDTO {

    private String designerId;
    private String name;
    private LocalDate dob;
    private String country;
    private String KimageURL;

}
