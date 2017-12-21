package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Ejemplar;

import com.mycompany.myapp.repository.EjemplarRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Ejemplar.
 */
@RestController
@RequestMapping("/api")
public class EjemplarResource {

    private final Logger log = LoggerFactory.getLogger(EjemplarResource.class);

    private static final String ENTITY_NAME = "ejemplar";

    private final EjemplarRepository ejemplarRepository;

    public EjemplarResource(EjemplarRepository ejemplarRepository) {
        this.ejemplarRepository = ejemplarRepository;
    }

    /**
     * POST  /ejemplars : Create a new ejemplar.
     *
     * @param ejemplar the ejemplar to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ejemplar, or with status 400 (Bad Request) if the ejemplar has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ejemplars")
    @Timed
    public ResponseEntity<Ejemplar> createEjemplar(@Valid @RequestBody Ejemplar ejemplar) throws URISyntaxException {
        log.debug("REST request to save Ejemplar : {}", ejemplar);
        if (ejemplar.getId() != null) {
            throw new BadRequestAlertException("A new ejemplar cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ejemplar result = ejemplarRepository.save(ejemplar);
        return ResponseEntity.created(new URI("/api/ejemplars/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ejemplars : Updates an existing ejemplar.
     *
     * @param ejemplar the ejemplar to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ejemplar,
     * or with status 400 (Bad Request) if the ejemplar is not valid,
     * or with status 500 (Internal Server Error) if the ejemplar couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ejemplars")
    @Timed
    public ResponseEntity<Ejemplar> updateEjemplar(@Valid @RequestBody Ejemplar ejemplar) throws URISyntaxException {
        log.debug("REST request to update Ejemplar : {}", ejemplar);
        if (ejemplar.getId() == null) {
            return createEjemplar(ejemplar);
        }
        Ejemplar result = ejemplarRepository.save(ejemplar);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ejemplar.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ejemplars : get all the ejemplars.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ejemplars in body
     */
    @GetMapping("/ejemplars")
    @Timed
    public List<Ejemplar> getAllEjemplars() {
        log.debug("REST request to get all Ejemplars");
        return ejemplarRepository.findAll();
        }

    /**
     * GET  /ejemplars/:id : get the "id" ejemplar.
     *
     * @param id the id of the ejemplar to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ejemplar, or with status 404 (Not Found)
     */
    @GetMapping("/ejemplars/{id}")
    @Timed
    public ResponseEntity<Ejemplar> getEjemplar(@PathVariable Long id) {
        log.debug("REST request to get Ejemplar : {}", id);
        Ejemplar ejemplar = ejemplarRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ejemplar));
    }

    /**
     * DELETE  /ejemplars/:id : delete the "id" ejemplar.
     *
     * @param id the id of the ejemplar to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ejemplars/{id}")
    @Timed
    public ResponseEntity<Void> deleteEjemplar(@PathVariable Long id) {
        log.debug("REST request to delete Ejemplar : {}", id);
        ejemplarRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
