package bo.edu.uasb.service.impl;

import bo.edu.uasb.service.EditorialService;
import bo.edu.uasb.domain.Editorial;
import bo.edu.uasb.repository.EditorialRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Editorial.
 */
@Service
@Transactional
public class EditorialServiceImpl implements EditorialService {

    private final Logger log = LoggerFactory.getLogger(EditorialServiceImpl.class);

    private final EditorialRepository editorialRepository;

    public EditorialServiceImpl(EditorialRepository editorialRepository) {
        this.editorialRepository = editorialRepository;
    }

    /**
     * Save a editorial.
     *
     * @param editorial the entity to save
     * @return the persisted entity
     */
    @Override
    public Editorial save(Editorial editorial) {
        log.debug("Request to save Editorial : {}", editorial);        return editorialRepository.save(editorial);
    }

    /**
     * Get all the editorials.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Editorial> findAll() {
        log.debug("Request to get all Editorials");
        return editorialRepository.findAll();
    }


    /**
     * Get one editorial by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Editorial> findOne(Long id) {
        log.debug("Request to get Editorial : {}", id);
        return editorialRepository.findById(id);
    }

    /**
     * Delete the editorial by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Editorial : {}", id);
        editorialRepository.deleteById(id);
    }
}
