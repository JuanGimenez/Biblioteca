package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Libro;

import com.mycompany.myapp.repository.LibroRepository;
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
 * REST controller for managing Libro.
 */
@RestController
@RequestMapping("/api")
public class LibroResource {

    private final Logger log = LoggerFactory.getLogger(LibroResource.class);

    private static final String ENTITY_NAME = "libro";

    private final LibroRepository libroRepository;

    public LibroResource(LibroRepository libroRepository) {
        this.libroRepository = libroRepository;
    }

    /**
     * POST  /libros : Create a new libro.
     *
     * @param libro the libro to create
     * @return the ResponseEntity with status 201 (Created) and with body the new libro, or with status 400 (Bad Request) if the libro has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/libros")
    @Timed
    public ResponseEntity<Libro> createLibro(@Valid @RequestBody Libro libro) throws URISyntaxException {
        log.debug("REST request to save Libro : {}", libro);
        if (libro.getId() != null) {
            throw new BadRequestAlertException("A new libro cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Libro result = libroRepository.save(libro);
        return ResponseEntity.created(new URI("/api/libros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /libros : Updates an existing libro.
     *
     * @param libro the libro to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated libro,
     * or with status 400 (Bad Request) if the libro is not valid,
     * or with status 500 (Internal Server Error) if the libro couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/libros")
    @Timed
    public ResponseEntity<Libro> updateLibro(@Valid @RequestBody Libro libro) throws URISyntaxException {
        log.debug("REST request to update Libro : {}", libro);
        if (libro.getId() == null) {
            return createLibro(libro);
        }
        Libro result = libroRepository.save(libro);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, libro.getId().toString()))
            .body(result);
    }

    /**
     * GET  /libros : get all the libros.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of libros in body
     */
    @GetMapping("/libros")
    @Timed
    public List<Libro> getAllLibros() {
        log.debug("REST request to get all Libros");
        return libroRepository.findAll();
        }

    /**
     * GET  /libros/:id : get the "id" libro.
     *
     * @param id the id of the libro to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the libro, or with status 404 (Not Found)
     */
    @GetMapping("/libros/{id}")
    @Timed
    public ResponseEntity<Libro> getLibro(@PathVariable Long id) {
        log.debug("REST request to get Libro : {}", id);
        Libro libro = libroRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(libro));
    }

    /**
     * DELETE  /libros/:id : delete the "id" libro.
     *
     * @param id the id of the libro to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/libros/{id}")
    @Timed
    public ResponseEntity<Void> deleteLibro(@PathVariable Long id) {
        log.debug("REST request to delete Libro : {}", id);
        libroRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
