package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.BibliotecaApp;

import com.mycompany.myapp.domain.Libreria;
import com.mycompany.myapp.repository.LibreriaRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the LibreriaResource REST controller.
 *
 * @see LibreriaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BibliotecaApp.class)
public class LibreriaResourceIntTest {

    private static final String DEFAULT_COD_LIBRERIA = "AAAAAAAAAA";
    private static final String UPDATED_COD_LIBRERIA = "BBBBBBBBBB";

    private static final Integer DEFAULT_CAPACIDAD = 1;
    private static final Integer UPDATED_CAPACIDAD = 2;

    @Autowired
    private LibreriaRepository libreriaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLibreriaMockMvc;

    private Libreria libreria;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LibreriaResource libreriaResource = new LibreriaResource(libreriaRepository);
        this.restLibreriaMockMvc = MockMvcBuilders.standaloneSetup(libreriaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Libreria createEntity(EntityManager em) {
        Libreria libreria = new Libreria()
            .codLibreria(DEFAULT_COD_LIBRERIA)
            .capacidad(DEFAULT_CAPACIDAD);
        return libreria;
    }

    @Before
    public void initTest() {
        libreria = createEntity(em);
    }

    @Test
    @Transactional
    public void createLibreria() throws Exception {
        int databaseSizeBeforeCreate = libreriaRepository.findAll().size();

        // Create the Libreria
        restLibreriaMockMvc.perform(post("/api/librerias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(libreria)))
            .andExpect(status().isCreated());

        // Validate the Libreria in the database
        List<Libreria> libreriaList = libreriaRepository.findAll();
        assertThat(libreriaList).hasSize(databaseSizeBeforeCreate + 1);
        Libreria testLibreria = libreriaList.get(libreriaList.size() - 1);
        assertThat(testLibreria.getCodLibreria()).isEqualTo(DEFAULT_COD_LIBRERIA);
        assertThat(testLibreria.getCapacidad()).isEqualTo(DEFAULT_CAPACIDAD);
    }

    @Test
    @Transactional
    public void createLibreriaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = libreriaRepository.findAll().size();

        // Create the Libreria with an existing ID
        libreria.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLibreriaMockMvc.perform(post("/api/librerias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(libreria)))
            .andExpect(status().isBadRequest());

        // Validate the Libreria in the database
        List<Libreria> libreriaList = libreriaRepository.findAll();
        assertThat(libreriaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodLibreriaIsRequired() throws Exception {
        int databaseSizeBeforeTest = libreriaRepository.findAll().size();
        // set the field null
        libreria.setCodLibreria(null);

        // Create the Libreria, which fails.

        restLibreriaMockMvc.perform(post("/api/librerias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(libreria)))
            .andExpect(status().isBadRequest());

        List<Libreria> libreriaList = libreriaRepository.findAll();
        assertThat(libreriaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLibrerias() throws Exception {
        // Initialize the database
        libreriaRepository.saveAndFlush(libreria);

        // Get all the libreriaList
        restLibreriaMockMvc.perform(get("/api/librerias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(libreria.getId().intValue())))
            .andExpect(jsonPath("$.[*].codLibreria").value(hasItem(DEFAULT_COD_LIBRERIA.toString())))
            .andExpect(jsonPath("$.[*].capacidad").value(hasItem(DEFAULT_CAPACIDAD)));
    }

    @Test
    @Transactional
    public void getLibreria() throws Exception {
        // Initialize the database
        libreriaRepository.saveAndFlush(libreria);

        // Get the libreria
        restLibreriaMockMvc.perform(get("/api/librerias/{id}", libreria.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(libreria.getId().intValue()))
            .andExpect(jsonPath("$.codLibreria").value(DEFAULT_COD_LIBRERIA.toString()))
            .andExpect(jsonPath("$.capacidad").value(DEFAULT_CAPACIDAD));
    }

    @Test
    @Transactional
    public void getNonExistingLibreria() throws Exception {
        // Get the libreria
        restLibreriaMockMvc.perform(get("/api/librerias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLibreria() throws Exception {
        // Initialize the database
        libreriaRepository.saveAndFlush(libreria);
        int databaseSizeBeforeUpdate = libreriaRepository.findAll().size();

        // Update the libreria
        Libreria updatedLibreria = libreriaRepository.findOne(libreria.getId());
        // Disconnect from session so that the updates on updatedLibreria are not directly saved in db
        em.detach(updatedLibreria);
        updatedLibreria
            .codLibreria(UPDATED_COD_LIBRERIA)
            .capacidad(UPDATED_CAPACIDAD);

        restLibreriaMockMvc.perform(put("/api/librerias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLibreria)))
            .andExpect(status().isOk());

        // Validate the Libreria in the database
        List<Libreria> libreriaList = libreriaRepository.findAll();
        assertThat(libreriaList).hasSize(databaseSizeBeforeUpdate);
        Libreria testLibreria = libreriaList.get(libreriaList.size() - 1);
        assertThat(testLibreria.getCodLibreria()).isEqualTo(UPDATED_COD_LIBRERIA);
        assertThat(testLibreria.getCapacidad()).isEqualTo(UPDATED_CAPACIDAD);
    }

    @Test
    @Transactional
    public void updateNonExistingLibreria() throws Exception {
        int databaseSizeBeforeUpdate = libreriaRepository.findAll().size();

        // Create the Libreria

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLibreriaMockMvc.perform(put("/api/librerias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(libreria)))
            .andExpect(status().isCreated());

        // Validate the Libreria in the database
        List<Libreria> libreriaList = libreriaRepository.findAll();
        assertThat(libreriaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLibreria() throws Exception {
        // Initialize the database
        libreriaRepository.saveAndFlush(libreria);
        int databaseSizeBeforeDelete = libreriaRepository.findAll().size();

        // Get the libreria
        restLibreriaMockMvc.perform(delete("/api/librerias/{id}", libreria.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Libreria> libreriaList = libreriaRepository.findAll();
        assertThat(libreriaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Libreria.class);
        Libreria libreria1 = new Libreria();
        libreria1.setId(1L);
        Libreria libreria2 = new Libreria();
        libreria2.setId(libreria1.getId());
        assertThat(libreria1).isEqualTo(libreria2);
        libreria2.setId(2L);
        assertThat(libreria1).isNotEqualTo(libreria2);
        libreria1.setId(null);
        assertThat(libreria1).isNotEqualTo(libreria2);
    }
}
