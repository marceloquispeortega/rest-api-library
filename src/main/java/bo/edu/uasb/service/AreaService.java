package bo.edu.uasb.service;

import bo.edu.uasb.domain.Area;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Area.
 */
public interface AreaService {

    /**
     * Save a area.
     *
     * @param area the entity to save
     * @return the persisted entity
     */
    Area save(Area area);

    /**
     * Get all the areas.
     *
     * @return the list of entities
     */
    List<Area> findAll();


    /**
     * Get the "id" area.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Area> findOne(Long id);

    /**
     * Delete the "id" area.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
