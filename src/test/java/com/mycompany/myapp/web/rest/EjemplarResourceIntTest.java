package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.BibliotecaApp;

import com.mycompany.myapp.domain.Ejemplar;
import com.mycompany.myapp.repository.EjemplarRepository;
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

import com.mycompany.myapp.domain.enumeration.Language;
/**
 * Test class for the EjemplarResource REST controller.
 *
 * @see EjemplarResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BibliotecaApp.class)
public class EjemplarResourceIntTest {

    private static final String DEFAULT_ISBN = "AAAAAAAAAA";
    private static final String UPDATED_ISBN = "BBBBBBBBBB";

    private static final String DEFAULT_TITULO_LIBRO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO_LIBRO = "BBBBBBBBBB";

    private static final String DEFAULT_AUTOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTOR = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMERO_EJEMPLARES = 1;
    private static final Integer UPDATED_NUMERO_EJEMPLARES = 2;

    private static final Integer DEFAULT_EJEMPLARES_DISPONIBLES = 1;
    private static final Integer UPDATED_EJEMPLARES_DISPONIBLES = 2;

    private static final Language DEFAULT_IDIOMA = Language.FRENCH;
    private static final Language UPDATED_IDIOMA = Language.ENGLISH;

    @Autowired
    private EjemplarRepository ejemplarRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEjemplarMockMvc;

    private Ejemplar ejemplar;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EjemplarResource ejemplarResource = new EjemplarResource(ejemplarRepository);
        this.restEjemplarMockMvc = MockMvcBuilders.standaloneSetup(ejemplarResource)
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
    public static Ejemplar createEntity(EntityManager em) {
        Ejemplar ejemplar = new Ejemplar()
            .isbn(DEFAULT_ISBN)
            .tituloLibro(DEFAULT_TITULO_LIBRO)
            .autor(DEFAULT_AUTOR)
            .numeroEjemplares(DEFAULT_NUMERO_EJEMPLARES)
            .ejemplaresDisponibles(DEFAULT_EJEMPLARES_DISPONIBLES)
            .idioma(DEFAULT_IDIOMA);
        return ejemplar;
    }

    @Before
    public void initTest() {
        ejemplar = createEntity(em);
    }

    @Test
    @Transactional
    public void createEjemplar() throws Exception {
        int databaseSizeBeforeCreate = ejemplarRepository.findAll().size();

        // Create the Ejemplar
        restEjemplarMockMvc.perform(post("/api/ejemplars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ejemplar)))
            .andExpect(status().isCreated());

        // Validate the Ejemplar in the database
        List<Ejemplar> ejemplarList = ejemplarRepository.findAll();
        assertThat(ejemplarList).hasSize(databaseSizeBeforeCreate + 1);
        Ejemplar testEjemplar = ejemplarList.get(ejemplarList.size() - 1);
        assertThat(testEjemplar.getIsbn()).isEqualTo(DEFAULT_ISBN);
        assertThat(testEjemplar.getTituloLibro()).isEqualTo(DEFAULT_TITULO_LIBRO);
        assertThat(testEjemplar.getAutor()).isEqualTo(DEFAULT_AUTOR);
        assertThat(testEjemplar.getNumeroEjemplares()).isEqualTo(DEFAULT_NUMERO_EJEMPLARES);
        assertThat(testEjemplar.getEjemplaresDisponibles()).isEqualTo(DEFAULT_EJEMPLARES_DISPONIBLES);
        assertThat(testEjemplar.getIdioma()).isEqualTo(DEFAULT_IDIOMA);
    }

    @Test
    @Transactional
    public void createEjemplarWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ejemplarRepository.findAll().size();

        // Create the Ejemplar with an existing ID
        ejemplar.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEjemplarMockMvc.perform(post("/api/ejemplars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ejemplar)))
            .andExpect(status().isBadRequest());

        // Validate the Ejemplar in the database
        List<Ejemplar> ejemplarList = ejemplarRepository.findAll();
        assertThat(ejemplarList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIsbnIsRequired() throws Exception {
        int databaseSizeBeforeTest = ejemplarRepository.findAll().size();
        // set the field null
        ejemplar.setIsbn(null);

        // Create the Ejemplar, which fails.

        restEjemplarMockMvc.perform(post("/api/ejemplars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ejemplar)))
            .andExpect(status().isBadRequest());

        List<Ejemplar> ejemplarList = ejemplarRepository.findAll();
        assertThat(ejemplarList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEjemplars() throws Exception {
        // Initialize the database
        ejemplarRepository.saveAndFlush(ejemplar);

        // Get all the ejemplarList
        restEjemplarMockMvc.perform(get("/api/ejemplars?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ejemplar.getId().intValue())))
            .andExpect(jsonPath("$.[*].isbn").value(hasItem(DEFAULT_ISBN.toString())))
            .andExpect(jsonPath("$.[*].tituloLibro").value(hasItem(DEFAULT_TITULO_LIBRO.toString())))
            .andExpect(jsonPath("$.[*].autor").value(hasItem(DEFAULT_AUTOR.toString())))
            .andExpect(jsonPath("$.[*].numeroEjemplares").value(hasItem(DEFAULT_NUMERO_EJEMPLARES)))
            .andExpect(jsonPath("$.[*].ejemplaresDisponibles").value(hasItem(DEFAULT_EJEMPLARES_DISPONIBLES)))
            .andExpect(jsonPath("$.[*].idioma").value(hasItem(DEFAULT_IDIOMA.toString())));
    }

    @Test
    @Transactional
    public void getEjemplar() throws Exception {
        // Initialize the database
        ejemplarRepository.saveAndFlush(ejemplar);

        // Get the ejemplar
        restEjemplarMockMvc.perform(get("/api/ejemplars/{id}", ejemplar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ejemplar.getId().intValue()))
            .andExpect(jsonPath("$.isbn").value(DEFAULT_ISBN.toString()))
            .andExpect(jsonPath("$.tituloLibro").value(DEFAULT_TITULO_LIBRO.toString()))
            .andExpect(jsonPath("$.autor").value(DEFAULT_AUTOR.toString()))
            .andExpect(jsonPath("$.numeroEjemplares").value(DEFAULT_NUMERO_EJEMPLARES))
            .andExpect(jsonPath("$.ejemplaresDisponibles").value(DEFAULT_EJEMPLARES_DISPONIBLES))
            .andExpect(jsonPath("$.idioma").value(DEFAULT_IDIOMA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEjemplar() throws Exception {
        // Get the ejemplar
        restEjemplarMockMvc.perform(get("/api/ejemplars/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEjemplar() throws Exception {
        // Initialize the database
        ejemplarRepository.saveAndFlush(ejemplar);
        int databaseSizeBeforeUpdate = ejemplarRepository.findAll().size();

        // Update the ejemplar
        Ejemplar updatedEjemplar = ejemplarRepository.findOne(ejemplar.getId());
        // Disconnect from session so that the updates on updatedEjemplar are not directly saved in db
        em.detach(updatedEjemplar);
        updatedEjemplar
            .isbn(UPDATED_ISBN)
            .tituloLibro(UPDATED_TITULO_LIBRO)
            .autor(UPDATED_AUTOR)
            .numeroEjemplares(UPDATED_NUMERO_EJEMPLARES)
            .ejemplaresDisponibles(UPDATED_EJEMPLARES_DISPONIBLES)
            .idioma(UPDATED_IDIOMA);

        restEjemplarMockMvc.perform(put("/api/ejemplars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEjemplar)))
            .andExpect(status().isOk());

        // Validate the Ejemplar in the database
        List<Ejemplar> ejemplarList = ejemplarRepository.findAll();
        assertThat(ejemplarList).hasSize(databaseSizeBeforeUpdate);
        Ejemplar testEjemplar = ejemplarList.get(ejemplarList.size() - 1);
        assertThat(testEjemplar.getIsbn()).isEqualTo(UPDATED_ISBN);
        assertThat(testEjemplar.getTituloLibro()).isEqualTo(UPDATED_TITULO_LIBRO);
        assertThat(testEjemplar.getAutor()).isEqualTo(UPDATED_AUTOR);
        assertThat(testEjemplar.getNumeroEjemplares()).isEqualTo(UPDATED_NUMERO_EJEMPLARES);
        assertThat(testEjemplar.getEjemplaresDisponibles()).isEqualTo(UPDATED_EJEMPLARES_DISPONIBLES);
        assertThat(testEjemplar.getIdioma()).isEqualTo(UPDATED_IDIOMA);
    }

    @Test
    @Transactional
    public void updateNonExistingEjemplar() throws Exception {
        int databaseSizeBeforeUpdate = ejemplarRepository.findAll().size();

        // Create the Ejemplar

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEjemplarMockMvc.perform(put("/api/ejemplars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ejemplar)))
            .andExpect(status().isCreated());

        // Validate the Ejemplar in the database
        List<Ejemplar> ejemplarList = ejemplarRepository.findAll();
        assertThat(ejemplarList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEjemplar() throws Exception {
        // Initialize the database
        ejemplarRepository.saveAndFlush(ejemplar);
        int databaseSizeBeforeDelete = ejemplarRepository.findAll().size();

        // Get the ejemplar
        restEjemplarMockMvc.perform(delete("/api/ejemplars/{id}", ejemplar.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ejemplar> ejemplarList = ejemplarRepository.findAll();
        assertThat(ejemplarList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ejemplar.class);
        Ejemplar ejemplar1 = new Ejemplar();
        ejemplar1.setId(1L);
        Ejemplar ejemplar2 = new Ejemplar();
        ejemplar2.setId(ejemplar1.getId());
        assertThat(ejemplar1).isEqualTo(ejemplar2);
        ejemplar2.setId(2L);
        assertThat(ejemplar1).isNotEqualTo(ejemplar2);
        ejemplar1.setId(null);
        assertThat(ejemplar1).isNotEqualTo(ejemplar2);
    }
}
