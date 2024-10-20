package com.carlos.furniquest.dataaccesslayer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FurnitureRepository extends JpaRepository<Furniture, Integer>{

    Furniture findFurnitureByFurnitureId(String furnitureId);

    List<Furniture> findFurnitureByDesigner_DesignerId(String designer_id);




}










