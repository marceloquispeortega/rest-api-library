package bo.edu.uasb.web.rest;

import bo.edu.uasb.LibraryApp;

import bo.edu.uasb.domain.Editorial;
import bo.edu.uasb.repository.EditorialRepository;
import bo.edu.uasb.service.EditorialService;
import bo.edu.uasb.web.rest.errors.ExceptionTranslator;

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


import static bo.edu.uasb.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EditorialResource REST controller.
 *
 * @see EditorialResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LibraryApp.class)
public class EditorialResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    @Autowired
    private EditorialRepository editorialRepository;

    

    @Autowired
    private EditorialService editorialService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEditorialMockMvc;

    private Editorial editorial;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EditorialResource editorialResource = new EditorialResource(editorialService);
        this.restEditorialMockMvc = MockMvcBuilders.standaloneSetup(editorialResource)
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
    public static Editorial createEntity(EntityManager em) {
        Editorial editorial = new Editorial()
            .name(DEFAULT_NAME)
            .address(DEFAULT_ADDRESS);
        return editorial;
    }

    @Before
    public void initTest() {
        editorial = createEntity(em);
    }

    @Test
    @Transactional
    public void createEditorial() throws Exception {
        int databaseSizeBeforeCreate = editorialRepository.findAll().size();

        // Create the Editorial
        restEditorialMockMvc.perform(post("/api/editorials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(editorial)))
            .andExpect(status().isCreated());

        // Validate the Editorial in the database
        List<Editorial> editorialList = editorialRepository.findAll();
        assertThat(editorialList).hasSize(databaseSizeBeforeCreate + 1);
        Editorial testEditorial = editorialList.get(editorialList.size() - 1);
        assertThat(testEditorial.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEditorial.getAddress()).isEqualTo(DEFAULT_ADDRESS);
    }

    @Test
    @Transactional
    public void createEditorialWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = editorialRepository.findAll().size();

        // Create the Editorial with an existing ID
        editorial.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEditorialMockMvc.perform(post("/api/editorials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(editorial)))
            .andExpect(status().isBadRequest());

        // Validate the Editorial in the database
        List<Editorial> editorialList = editorialRepository.findAll();
        assertThat(editorialList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = editorialRepository.findAll().size();
        // set the field null
        editorial.setName(null);

        // Create the Editorial, which fails.

        restEditorialMockMvc.perform(post("/api/editorials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(editorial)))
            .andExpect(status().isBadRequest());

        List<Editorial> editorialList = editorialRepository.findAll();
        assertThat(editorialList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEditorials() throws Exception {
        // Initialize the database
        editorialRepository.saveAndFlush(editorial);

        // Get all the editorialList
        restEditorialMockMvc.perform(get("/api/editorials?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(editorial.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())));
    }
    

    @Test
    @Transactional
    public void getEditorial() throws Exception {
        // Initialize the database
        editorialRepository.saveAndFlush(editorial);

        // Get the editorial
        restEditorialMockMvc.perform(get("/api/editorials/{id}", editorial.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(editorial.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingEditorial() throws Exception {
        // Get the editorial
        restEditorialMockMvc.perform(get("/api/editorials/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEditorial() throws Exception {
        // Initialize the database
        editorialService.save(editorial);

        int databaseSizeBeforeUpdate = editorialRepository.findAll().size();

        // Update the editorial
        Editorial updatedEditorial = editorialRepository.findById(editorial.getId()).get();
        // Disconnect from session so that the updates on updatedEditorial are not directly saved in db
        em.detach(updatedEditorial);
        updatedEditorial
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS);

        restEditorialMockMvc.perform(put("/api/editorials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEditorial)))
            .andExpect(status().isOk());

        // Validate the Editorial in the database
        List<Editorial> editorialList = editorialRepository.findAll();
        assertThat(editorialList).hasSize(databaseSizeBeforeUpdate);
        Editorial testEditorial = editorialList.get(editorialList.size() - 1);
        assertThat(testEditorial.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEditorial.getAddress()).isEqualTo(UPDATED_ADDRESS);
    }

    @Test
    @Transactional
    public void updateNonExistingEditorial() throws Exception {
        int databaseSizeBeforeUpdate = editorialRepository.findAll().size();

        // Create the Editorial

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEditorialMockMvc.perform(put("/api/editorials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(editorial)))
            .andExpect(status().isBadRequest());

        // Validate the Editorial in the database
        List<Editorial> editorialList = editorialRepository.findAll();
        assertThat(editorialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEditorial() throws Exception {
        // Initialize the database
        editorialService.save(editorial);

        int databaseSizeBeforeDelete = editorialRepository.findAll().size();

        // Get the editorial
        restEditorialMockMvc.perform(delete("/api/editorials/{id}", editorial.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Editorial> editorialList = editorialRepository.findAll();
        assertThat(editorialList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Editorial.class);
        Editorial editorial1 = new Editorial();
        editorial1.setId(1L);
        Editorial editorial2 = new Editorial();
        editorial2.setId(editorial1.getId());
        assertThat(editorial1).isEqualTo(editorial2);
        editorial2.setId(2L);
        assertThat(editorial1).isNotEqualTo(editorial2);
        editorial1.setId(null);
        assertThat(editorial1).isNotEqualTo(editorial2);
    }
}
