package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.BibliotecaApp;

import com.mycompany.myapp.domain.Empleado;
import com.mycompany.myapp.repository.EmpleadoRepository;
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
 * Test class for the EmpleadoResource REST controller.
 *
 * @see EmpleadoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BibliotecaApp.class)
public class EmpleadoResourceIntTest {

    private static final String DEFAULT_COD_EMPLEADO = "AAAAAAAAAA";
    private static final String UPDATED_COD_EMPLEADO = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE_EMPLEADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_EMPLEADO = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDO_EMPLEADO = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDO_EMPLEADO = "BBBBBBBBBB";

    private static final String DEFAULT_DEPARTAMENTO_EMPLEADO = "AAAAAAAAAA";
    private static final String UPDATED_DEPARTAMENTO_EMPLEADO = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmpleadoMockMvc;

    private Empleado empleado;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmpleadoResource empleadoResource = new EmpleadoResource(empleadoRepository);
        this.restEmpleadoMockMvc = MockMvcBuilders.standaloneSetup(empleadoResource)
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
    public static Empleado createEntity(EntityManager em) {
        Empleado empleado = new Empleado()
            .codEmpleado(DEFAULT_COD_EMPLEADO)
            .nombreEmpleado(DEFAULT_NOMBRE_EMPLEADO)
            .apellidoEmpleado(DEFAULT_APELLIDO_EMPLEADO)
            .departamentoEmpleado(DEFAULT_DEPARTAMENTO_EMPLEADO)
            .email(DEFAULT_EMAIL)
            .telefono(DEFAULT_TELEFONO);
        return empleado;
    }

    @Before
    public void initTest() {
        empleado = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmpleado() throws Exception {
        int databaseSizeBeforeCreate = empleadoRepository.findAll().size();

        // Create the Empleado
        restEmpleadoMockMvc.perform(post("/api/empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empleado)))
            .andExpect(status().isCreated());

        // Validate the Empleado in the database
        List<Empleado> empleadoList = empleadoRepository.findAll();
        assertThat(empleadoList).hasSize(databaseSizeBeforeCreate + 1);
        Empleado testEmpleado = empleadoList.get(empleadoList.size() - 1);
        assertThat(testEmpleado.getCodEmpleado()).isEqualTo(DEFAULT_COD_EMPLEADO);
        assertThat(testEmpleado.getNombreEmpleado()).isEqualTo(DEFAULT_NOMBRE_EMPLEADO);
        assertThat(testEmpleado.getApellidoEmpleado()).isEqualTo(DEFAULT_APELLIDO_EMPLEADO);
        assertThat(testEmpleado.getDepartamentoEmpleado()).isEqualTo(DEFAULT_DEPARTAMENTO_EMPLEADO);
        assertThat(testEmpleado.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testEmpleado.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
    }

    @Test
    @Transactional
    public void createEmpleadoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = empleadoRepository.findAll().size();

        // Create the Empleado with an existing ID
        empleado.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmpleadoMockMvc.perform(post("/api/empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empleado)))
            .andExpect(status().isBadRequest());

        // Validate the Empleado in the database
        List<Empleado> empleadoList = empleadoRepository.findAll();
        assertThat(empleadoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodEmpleadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = empleadoRepository.findAll().size();
        // set the field null
        empleado.setCodEmpleado(null);

        // Create the Empleado, which fails.

        restEmpleadoMockMvc.perform(post("/api/empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empleado)))
            .andExpect(status().isBadRequest());

        List<Empleado> empleadoList = empleadoRepository.findAll();
        assertThat(empleadoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmpleados() throws Exception {
        // Initialize the database
        empleadoRepository.saveAndFlush(empleado);

        // Get all the empleadoList
        restEmpleadoMockMvc.perform(get("/api/empleados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(empleado.getId().intValue())))
            .andExpect(jsonPath("$.[*].codEmpleado").value(hasItem(DEFAULT_COD_EMPLEADO.toString())))
            .andExpect(jsonPath("$.[*].nombreEmpleado").value(hasItem(DEFAULT_NOMBRE_EMPLEADO.toString())))
            .andExpect(jsonPath("$.[*].apellidoEmpleado").value(hasItem(DEFAULT_APELLIDO_EMPLEADO.toString())))
            .andExpect(jsonPath("$.[*].departamentoEmpleado").value(hasItem(DEFAULT_DEPARTAMENTO_EMPLEADO.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())));
    }

    @Test
    @Transactional
    public void getEmpleado() throws Exception {
        // Initialize the database
        empleadoRepository.saveAndFlush(empleado);

        // Get the empleado
        restEmpleadoMockMvc.perform(get("/api/empleados/{id}", empleado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(empleado.getId().intValue()))
            .andExpect(jsonPath("$.codEmpleado").value(DEFAULT_COD_EMPLEADO.toString()))
            .andExpect(jsonPath("$.nombreEmpleado").value(DEFAULT_NOMBRE_EMPLEADO.toString()))
            .andExpect(jsonPath("$.apellidoEmpleado").value(DEFAULT_APELLIDO_EMPLEADO.toString()))
            .andExpect(jsonPath("$.departamentoEmpleado").value(DEFAULT_DEPARTAMENTO_EMPLEADO.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmpleado() throws Exception {
        // Get the empleado
        restEmpleadoMockMvc.perform(get("/api/empleados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmpleado() throws Exception {
        // Initialize the database
        empleadoRepository.saveAndFlush(empleado);
        int databaseSizeBeforeUpdate = empleadoRepository.findAll().size();

        // Update the empleado
        Empleado updatedEmpleado = empleadoRepository.findOne(empleado.getId());
        // Disconnect from session so that the updates on updatedEmpleado are not directly saved in db
        em.detach(updatedEmpleado);
        updatedEmpleado
            .codEmpleado(UPDATED_COD_EMPLEADO)
            .nombreEmpleado(UPDATED_NOMBRE_EMPLEADO)
            .apellidoEmpleado(UPDATED_APELLIDO_EMPLEADO)
            .departamentoEmpleado(UPDATED_DEPARTAMENTO_EMPLEADO)
            .email(UPDATED_EMAIL)
            .telefono(UPDATED_TELEFONO);

        restEmpleadoMockMvc.perform(put("/api/empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmpleado)))
            .andExpect(status().isOk());

        // Validate the Empleado in the database
        List<Empleado> empleadoList = empleadoRepository.findAll();
        assertThat(empleadoList).hasSize(databaseSizeBeforeUpdate);
        Empleado testEmpleado = empleadoList.get(empleadoList.size() - 1);
        assertThat(testEmpleado.getCodEmpleado()).isEqualTo(UPDATED_COD_EMPLEADO);
        assertThat(testEmpleado.getNombreEmpleado()).isEqualTo(UPDATED_NOMBRE_EMPLEADO);
        assertThat(testEmpleado.getApellidoEmpleado()).isEqualTo(UPDATED_APELLIDO_EMPLEADO);
        assertThat(testEmpleado.getDepartamentoEmpleado()).isEqualTo(UPDATED_DEPARTAMENTO_EMPLEADO);
        assertThat(testEmpleado.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testEmpleado.getTelefono()).isEqualTo(UPDATED_TELEFONO);
    }

    @Test
    @Transactional
    public void updateNonExistingEmpleado() throws Exception {
        int databaseSizeBeforeUpdate = empleadoRepository.findAll().size();

        // Create the Empleado

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmpleadoMockMvc.perform(put("/api/empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empleado)))
            .andExpect(status().isCreated());

        // Validate the Empleado in the database
        List<Empleado> empleadoList = empleadoRepository.findAll();
        assertThat(empleadoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmpleado() throws Exception {
        // Initialize the database
        empleadoRepository.saveAndFlush(empleado);
        int databaseSizeBeforeDelete = empleadoRepository.findAll().size();

        // Get the empleado
        restEmpleadoMockMvc.perform(delete("/api/empleados/{id}", empleado.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Empleado> empleadoList = empleadoRepository.findAll();
        assertThat(empleadoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Empleado.class);
        Empleado empleado1 = new Empleado();
        empleado1.setId(1L);
        Empleado empleado2 = new Empleado();
        empleado2.setId(empleado1.getId());
        assertThat(empleado1).isEqualTo(empleado2);
        empleado2.setId(2L);
        assertThat(empleado1).isNotEqualTo(empleado2);
        empleado1.setId(null);
        assertThat(empleado1).isNotEqualTo(empleado2);
    }
}
