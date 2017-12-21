package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.BibliotecaApp;

import com.mycompany.myapp.domain.Prestamo;
import com.mycompany.myapp.repository.PrestamoRepository;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PrestamoResource REST controller.
 *
 * @see PrestamoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BibliotecaApp.class)
public class PrestamoResourceIntTest {

    private static final String DEFAULT_CODIGO_PRESTAMO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_PRESTAMO = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FECHA_PRESTADO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_PRESTADO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_FECHAS_DEVUELTO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHAS_DEVUELTO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private PrestamoRepository prestamoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPrestamoMockMvc;

    private Prestamo prestamo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrestamoResource prestamoResource = new PrestamoResource(prestamoRepository);
        this.restPrestamoMockMvc = MockMvcBuilders.standaloneSetup(prestamoResource)
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
    public static Prestamo createEntity(EntityManager em) {
        Prestamo prestamo = new Prestamo()
            .codigoPrestamo(DEFAULT_CODIGO_PRESTAMO)
            .fechaPrestado(DEFAULT_FECHA_PRESTADO)
            .fechasDevuelto(DEFAULT_FECHAS_DEVUELTO);
        return prestamo;
    }

    @Before
    public void initTest() {
        prestamo = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrestamo() throws Exception {
        int databaseSizeBeforeCreate = prestamoRepository.findAll().size();

        // Create the Prestamo
        restPrestamoMockMvc.perform(post("/api/prestamos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prestamo)))
            .andExpect(status().isCreated());

        // Validate the Prestamo in the database
        List<Prestamo> prestamoList = prestamoRepository.findAll();
        assertThat(prestamoList).hasSize(databaseSizeBeforeCreate + 1);
        Prestamo testPrestamo = prestamoList.get(prestamoList.size() - 1);
        assertThat(testPrestamo.getCodigoPrestamo()).isEqualTo(DEFAULT_CODIGO_PRESTAMO);
        assertThat(testPrestamo.getFechaPrestado()).isEqualTo(DEFAULT_FECHA_PRESTADO);
        assertThat(testPrestamo.getFechasDevuelto()).isEqualTo(DEFAULT_FECHAS_DEVUELTO);
    }

    @Test
    @Transactional
    public void createPrestamoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prestamoRepository.findAll().size();

        // Create the Prestamo with an existing ID
        prestamo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrestamoMockMvc.perform(post("/api/prestamos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prestamo)))
            .andExpect(status().isBadRequest());

        // Validate the Prestamo in the database
        List<Prestamo> prestamoList = prestamoRepository.findAll();
        assertThat(prestamoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodigoPrestamoIsRequired() throws Exception {
        int databaseSizeBeforeTest = prestamoRepository.findAll().size();
        // set the field null
        prestamo.setCodigoPrestamo(null);

        // Create the Prestamo, which fails.

        restPrestamoMockMvc.perform(post("/api/prestamos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prestamo)))
            .andExpect(status().isBadRequest());

        List<Prestamo> prestamoList = prestamoRepository.findAll();
        assertThat(prestamoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPrestamos() throws Exception {
        // Initialize the database
        prestamoRepository.saveAndFlush(prestamo);

        // Get all the prestamoList
        restPrestamoMockMvc.perform(get("/api/prestamos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prestamo.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigoPrestamo").value(hasItem(DEFAULT_CODIGO_PRESTAMO.toString())))
            .andExpect(jsonPath("$.[*].fechaPrestado").value(hasItem(sameInstant(DEFAULT_FECHA_PRESTADO))))
            .andExpect(jsonPath("$.[*].fechasDevuelto").value(hasItem(sameInstant(DEFAULT_FECHAS_DEVUELTO))));
    }

    @Test
    @Transactional
    public void getPrestamo() throws Exception {
        // Initialize the database
        prestamoRepository.saveAndFlush(prestamo);

        // Get the prestamo
        restPrestamoMockMvc.perform(get("/api/prestamos/{id}", prestamo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(prestamo.getId().intValue()))
            .andExpect(jsonPath("$.codigoPrestamo").value(DEFAULT_CODIGO_PRESTAMO.toString()))
            .andExpect(jsonPath("$.fechaPrestado").value(sameInstant(DEFAULT_FECHA_PRESTADO)))
            .andExpect(jsonPath("$.fechasDevuelto").value(sameInstant(DEFAULT_FECHAS_DEVUELTO)));
    }

    @Test
    @Transactional
    public void getNonExistingPrestamo() throws Exception {
        // Get the prestamo
        restPrestamoMockMvc.perform(get("/api/prestamos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrestamo() throws Exception {
        // Initialize the database
        prestamoRepository.saveAndFlush(prestamo);
        int databaseSizeBeforeUpdate = prestamoRepository.findAll().size();

        // Update the prestamo
        Prestamo updatedPrestamo = prestamoRepository.findOne(prestamo.getId());
        // Disconnect from session so that the updates on updatedPrestamo are not directly saved in db
        em.detach(updatedPrestamo);
        updatedPrestamo
            .codigoPrestamo(UPDATED_CODIGO_PRESTAMO)
            .fechaPrestado(UPDATED_FECHA_PRESTADO)
            .fechasDevuelto(UPDATED_FECHAS_DEVUELTO);

        restPrestamoMockMvc.perform(put("/api/prestamos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrestamo)))
            .andExpect(status().isOk());

        // Validate the Prestamo in the database
        List<Prestamo> prestamoList = prestamoRepository.findAll();
        assertThat(prestamoList).hasSize(databaseSizeBeforeUpdate);
        Prestamo testPrestamo = prestamoList.get(prestamoList.size() - 1);
        assertThat(testPrestamo.getCodigoPrestamo()).isEqualTo(UPDATED_CODIGO_PRESTAMO);
        assertThat(testPrestamo.getFechaPrestado()).isEqualTo(UPDATED_FECHA_PRESTADO);
        assertThat(testPrestamo.getFechasDevuelto()).isEqualTo(UPDATED_FECHAS_DEVUELTO);
    }

    @Test
    @Transactional
    public void updateNonExistingPrestamo() throws Exception {
        int databaseSizeBeforeUpdate = prestamoRepository.findAll().size();

        // Create the Prestamo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPrestamoMockMvc.perform(put("/api/prestamos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prestamo)))
            .andExpect(status().isCreated());

        // Validate the Prestamo in the database
        List<Prestamo> prestamoList = prestamoRepository.findAll();
        assertThat(prestamoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePrestamo() throws Exception {
        // Initialize the database
        prestamoRepository.saveAndFlush(prestamo);
        int databaseSizeBeforeDelete = prestamoRepository.findAll().size();

        // Get the prestamo
        restPrestamoMockMvc.perform(delete("/api/prestamos/{id}", prestamo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Prestamo> prestamoList = prestamoRepository.findAll();
        assertThat(prestamoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Prestamo.class);
        Prestamo prestamo1 = new Prestamo();
        prestamo1.setId(1L);
        Prestamo prestamo2 = new Prestamo();
        prestamo2.setId(prestamo1.getId());
        assertThat(prestamo1).isEqualTo(prestamo2);
        prestamo2.setId(2L);
        assertThat(prestamo1).isNotEqualTo(prestamo2);
        prestamo1.setId(null);
        assertThat(prestamo1).isNotEqualTo(prestamo2);
    }
}
