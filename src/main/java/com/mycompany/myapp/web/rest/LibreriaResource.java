package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Libreria;

import com.mycompany.myapp.repository.LibreriaRepository;
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
 * REST controller for managing Libreria.
 */
@RestController
@RequestMapping("/api")
public class LibreriaResource {

    private final Logger log = LoggerFactory.getLogger(LibreriaResource.class);

    private static final String ENTITY_NAME = "libreria";

    private final LibreriaRepository libreriaRepository;

    public LibreriaResource(LibreriaRepository libreriaRepository) {
        this.libreriaRepository = libreriaRepository;
    }

    /**
     * POST  /librerias : Create a new libreria.
     *
     * @param libreria the libreria to create
     * @return the ResponseEntity with status 201 (Created) and with body the new libreria, or with status 400 (Bad Request) if the libreria has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/librerias")
    @Timed
    public ResponseEntity<Libreria> createLibreria(@Valid @RequestBody Libreria libreria) throws URISyntaxException {
        log.debug("REST request to save Libreria : {}", libreria);
        if (libreria.getId() != null) {
            throw new BadRequestAlertException("A new libreria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Libreria result = libreriaRepository.save(libreria);
        return ResponseEntity.created(new URI("/api/librerias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /librerias : Updates an existing libreria.
     *
     * @param libreria the libreria to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated libreria,
     * or with status 400 (Bad Request) if the libreria is not valid,
     * or with status 500 (Internal Server Error) if the libreria couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/librerias")
    @Timed
    public ResponseEntity<Libreria> updateLibreria(@Valid @RequestBody Libreria libreria) throws URISyntaxException {
        log.debug("REST request to update Libreria : {}", libreria);
        if (libreria.getId() == null) {
            return createLibreria(libreria);
        }
        Libreria result = libreriaRepository.save(libreria);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, libreria.getId().toString()))
            .body(result);
    }

    /**
     * GET  /librerias : get all the librerias.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of librerias in body
     */
    @GetMapping("/librerias")
    @Timed
    public List<Libreria> getAllLibrerias() {
        log.debug("REST request to get all Librerias");
        return libreriaRepository.findAll();
        }

    /**
     * GET  /librerias/:id : get the "id" libreria.
     *
     * @param id the id of the libreria to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the libreria, or with status 404 (Not Found)
     */
    @GetMapping("/librerias/{id}")
    @Timed
    public ResponseEntity<Libreria> getLibreria(@PathVariable Long id) {
        log.debug("REST request to get Libreria : {}", id);
        Libreria libreria = libreriaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(libreria));
    }

    /**
     * DELETE  /librerias/:id : delete the "id" libreria.
     *
     * @param id the id of the libreria to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/librerias/{id}")
    @Timed
    public ResponseEntity<Void> deleteLibreria(@PathVariable Long id) {
        log.debug("REST request to delete Libreria : {}", id);
        libreriaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
