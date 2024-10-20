package com.carlos.furniquest.businesslayer;

import com.carlos.furniquest.dataaccesslayer.Designer;
import com.carlos.furniquest.dataaccesslayer.DesignerRepository;
import com.carlos.furniquest.presentationlayer.designers.DesignerRequestDTO;
import com.carlos.furniquest.presentationlayer.designers.DesignerResponseDTO;
import com.carlos.furniquest.utils.exceptions.InUseException;
import com.carlos.furniquest.utils.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class DesignerServiceImpl implements DesignerService{

    private DesignerRepository designerRepository;

    public DesignerServiceImpl(DesignerRepository designerRepository){

        this.designerRepository = designerRepository;
    }

    @Override
    public List<DesignerResponseDTO> getAllDesigners() {

        List<Designer> designerEntities = designerRepository.findAll();

        List<DesignerResponseDTO> designerResponseDTOList = new ArrayList<>();


        for (Designer designer : designerEntities) {

            DesignerResponseDTO designerResponseDTO = new DesignerResponseDTO();
            BeanUtils.copyProperties(designer, designerResponseDTO);
            designerResponseDTOList.add(designerResponseDTO);
        }
        return designerResponseDTOList;
    }

    @Override
    public DesignerResponseDTO getOneDesigner(String designerId) {

        Designer designer = designerRepository.findDesignerByDesignerId(designerId);

        if(designer == null) {
            throw new NotFoundException("Unknown designerId" + designerId);
        }

        DesignerResponseDTO designerResponseDTO = new DesignerResponseDTO();
        BeanUtils.copyProperties(designer, designerResponseDTO);

        return designerResponseDTO;
    }


    @Override

    public DesignerResponseDTO addDesigner(DesignerRequestDTO designerRequestDTO){

        Designer designer = new Designer();

        BeanUtils.copyProperties(designerRequestDTO, designer);
        designer.setDesignerId(UUID.randomUUID().toString());

        Designer savedDesigner = designerRepository.save(designer);

        DesignerResponseDTO designerResponseDTO = new DesignerResponseDTO();
        BeanUtils.copyProperties(savedDesigner, designerResponseDTO);

        return designerResponseDTO;
    }



    @Override
    public DesignerResponseDTO updateDesigner(DesignerRequestDTO designerRequestDTO, String designerId) {

        Designer foundDesigner = designerRepository.findDesignerByDesignerId(designerId);

        if (foundDesigner == null){
            throw new NotFoundException("Unknown designerId" + designerId);
        }

        Designer designer = new Designer();
        BeanUtils.copyProperties(designerRequestDTO,designer);
        designer.setDesignerId(foundDesigner.getDesignerId());
        designer.setId(foundDesigner.getId());

        Designer savedDesigner = designerRepository.save(designer);

        DesignerResponseDTO designerResponseDTO = new DesignerResponseDTO();
        BeanUtils.copyProperties(savedDesigner, designerResponseDTO);

        return designerResponseDTO;
    }

    @Override
    public void deleteDesignerByDesignerId(String designerId) {

        Designer foundDesigner = designerRepository.findDesignerByDesignerId(designerId);

        if(foundDesigner == null ){
            throw new NotFoundException("Unknown designerId" + designerId);
        }

        try{
            designerRepository.delete(foundDesigner);
        }

        catch (DataIntegrityViolationException ex){

            throw new InUseException("Cannot delete designer with designerId: " + designerId +
                    "as it is currently assigned furniture");
        }

    }


}

