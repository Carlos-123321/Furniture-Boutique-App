package com.carlos.furniquest.dataaccesslayer;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table( name = "furniture")
@Data
@NoArgsConstructor
public class Furniture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; //database id

    @Column(name = "furniture_id")
    private String furnitureId; //public id

    private String name;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "material")
    private String material;

    @Column(name = "image_url")
    private String imageURL;



    @ManyToOne
    @JoinColumn(name = "designer_id", referencedColumnName = "designer_id")
    // name of column in movies (directorid), the second is Foreign key
    private Designer designer;

}
