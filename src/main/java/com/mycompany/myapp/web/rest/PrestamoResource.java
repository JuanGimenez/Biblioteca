package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Prestamo;

import com.mycompany.myapp.repository.PrestamoRepository;
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
 * REST controller for managing Prestamo.
 */
@RestController
@RequestMapping("/api")
public class PrestamoResource {

    private final Logger log = LoggerFactory.getLogger(PrestamoResource.class);

    private static final String ENTITY_NAME = "prestamo";

    private final PrestamoRepository prestamoRepository;

    public PrestamoResource(PrestamoRepository prestamoRepository) {
        this.prestamoRepository = prestamoRepository;
    }

    /**
     * POST  /prestamos : Create a new prestamo.
     *
     * @param prestamo the prestamo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new prestamo, or with status 400 (Bad Request) if the prestamo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/prestamos")
    @Timed
    public ResponseEntity<Prestamo> createPrestamo(@Valid @RequestBody Prestamo prestamo) throws URISyntaxException {
        log.debug("REST request to save Prestamo : {}", prestamo);
        if (prestamo.getId() != null) {
            throw new BadRequestAlertException("A new prestamo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Prestamo result = prestamoRepository.save(prestamo);
        return ResponseEntity.created(new URI("/api/prestamos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /prestamos : Updates an existing prestamo.
     *
     * @param prestamo the prestamo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated prestamo,
     * or with status 400 (Bad Request) if the prestamo is not valid,
     * or with status 500 (Internal Server Error) if the prestamo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/prestamos")
    @Timed
    public ResponseEntity<Prestamo> updatePrestamo(@Valid @RequestBody Prestamo prestamo) throws URISyntaxException {
        log.debug("REST request to update Prestamo : {}", prestamo);
        if (prestamo.getId() == null) {
            return createPrestamo(prestamo);
        }
        Prestamo result = prestamoRepository.save(prestamo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, prestamo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /prestamos : get all the prestamos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of prestamos in body
     */
    @GetMapping("/prestamos")
    @Timed
    public List<Prestamo> getAllPrestamos() {
        log.debug("REST request to get all Prestamos");
        return prestamoRepository.findAll();
        }

    /**
     * GET  /prestamos/:id : get the "id" prestamo.
     *
     * @param id the id of the prestamo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the prestamo, or with status 404 (Not Found)
     */
    @GetMapping("/prestamos/{id}")
    @Timed
    public ResponseEntity<Prestamo> getPrestamo(@PathVariable Long id) {
        log.debug("REST request to get Prestamo : {}", id);
        Prestamo prestamo = prestamoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(prestamo));
    }

    /**
     * DELETE  /prestamos/:id : delete the "id" prestamo.
     *
     * @param id the id of the prestamo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/prestamos/{id}")
    @Timed
    public ResponseEntity<Void> deletePrestamo(@PathVariable Long id) {
        log.debug("REST request to delete Prestamo : {}", id);
        prestamoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
