package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.Language;

/**
 * A Ejemplar.
 */
@Entity
@Table(name = "ejemplar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ejemplar implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "isbn", nullable = false)
    private String isbn;

    @Column(name = "titulo_libro")
    private String tituloLibro;

    @Column(name = "autor")
    private String autor;

    @Column(name = "numero_ejemplares")
    private Integer numeroEjemplares;

    @Column(name = "ejemplares_disponibles")
    private Integer ejemplaresDisponibles;

    @Enumerated(EnumType.STRING)
    @Column(name = "idioma")
    private Language idioma;

    @OneToMany(mappedBy = "ejemplar")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Libro> libros = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIsbn() {
        return isbn;
    }

    public Ejemplar isbn(String isbn) {
        this.isbn = isbn;
        return this;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getTituloLibro() {
        return tituloLibro;
    }

    public Ejemplar tituloLibro(String tituloLibro) {
        this.tituloLibro = tituloLibro;
        return this;
    }

    public void setTituloLibro(String tituloLibro) {
        this.tituloLibro = tituloLibro;
    }

    public String getAutor() {
        return autor;
    }

    public Ejemplar autor(String autor) {
        this.autor = autor;
        return this;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public Integer getNumeroEjemplares() {
        return numeroEjemplares;
    }

    public Ejemplar numeroEjemplares(Integer numeroEjemplares) {
        this.numeroEjemplares = numeroEjemplares;
        return this;
    }

    public void setNumeroEjemplares(Integer numeroEjemplares) {
        this.numeroEjemplares = numeroEjemplares;
    }

    public Integer getEjemplaresDisponibles() {
        return ejemplaresDisponibles;
    }

    public Ejemplar ejemplaresDisponibles(Integer ejemplaresDisponibles) {
        this.ejemplaresDisponibles = ejemplaresDisponibles;
        return this;
    }

    public void setEjemplaresDisponibles(Integer ejemplaresDisponibles) {
        this.ejemplaresDisponibles = ejemplaresDisponibles;
    }

    public Language getIdioma() {
        return idioma;
    }

    public Ejemplar idioma(Language idioma) {
        this.idioma = idioma;
        return this;
    }

    public void setIdioma(Language idioma) {
        this.idioma = idioma;
    }

    public Set<Libro> getLibros() {
        return libros;
    }

    public Ejemplar libros(Set<Libro> libros) {
        this.libros = libros;
        return this;
    }

    public Ejemplar addLibro(Libro libro) {
        this.libros.add(libro);
        libro.setEjemplar(this);
        return this;
    }

    public Ejemplar removeLibro(Libro libro) {
        this.libros.remove(libro);
        libro.setEjemplar(null);
        return this;
    }

    public void setLibros(Set<Libro> libros) {
        this.libros = libros;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Ejemplar ejemplar = (Ejemplar) o;
        if (ejemplar.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ejemplar.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ejemplar{" +
            "id=" + getId() +
            ", isbn='" + getIsbn() + "'" +
            ", tituloLibro='" + getTituloLibro() + "'" +
            ", autor='" + getAutor() + "'" +
            ", numeroEjemplares=" + getNumeroEjemplares() +
            ", ejemplaresDisponibles=" + getEjemplaresDisponibles() +
            ", idioma='" + getIdioma() + "'" +
            "}";
    }
}
