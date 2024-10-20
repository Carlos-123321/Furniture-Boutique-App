package com.carlos.furniquest.dataaccesslayer;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table( name = "designers")
@Data
@NoArgsConstructor
public class Designer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; //database id

    @Column(name="designer_id")
    private String designerId;

    private String name;

    @Column(name = "dob")
    private LocalDate dob;


    @Column(name="country")
    private String country;

    @Column(name="Kimageurl")
    private String KimageURL;

    //One designer can be associated with multiple furniture
    @OneToMany(mappedBy = "designer")
    private Set<Furniture> furniture;


}


