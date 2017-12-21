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

import com.mycompany.myapp.domain.enumeration.Estado;

/**
 * A Libro.
 */
@Entity
@Table(name = "libro")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Libro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "cod_libro", nullable = false)
    private String codLibro;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private Estado estado;

    @OneToMany(mappedBy = "libro")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Prestamo> prestamos = new HashSet<>();

    @ManyToOne
    private Ejemplar ejemplar;

    @ManyToOne
    private Libreria libreria;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodLibro() {
        return codLibro;
    }

    public Libro codLibro(String codLibro) {
        this.codLibro = codLibro;
        return this;
    }

    public void setCodLibro(String codLibro) {
        this.codLibro = codLibro;
    }

    public Estado getEstado() {
        return estado;
    }

    public Libro estado(Estado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public Set<Prestamo> getPrestamos() {
        return prestamos;
    }

    public Libro prestamos(Set<Prestamo> prestamos) {
        this.prestamos = prestamos;
        return this;
    }

    public Libro addPrestamo(Prestamo prestamo) {
        this.prestamos.add(prestamo);
        prestamo.setLibro(this);
        return this;
    }

    public Libro removePrestamo(Prestamo prestamo) {
        this.prestamos.remove(prestamo);
        prestamo.setLibro(null);
        return this;
    }

    public void setPrestamos(Set<Prestamo> prestamos) {
        this.prestamos = prestamos;
    }

    public Ejemplar getEjemplar() {
        return ejemplar;
    }

    public Libro ejemplar(Ejemplar ejemplar) {
        this.ejemplar = ejemplar;
        return this;
    }

    public void setEjemplar(Ejemplar ejemplar) {
        this.ejemplar = ejemplar;
    }

    public Libreria getLibreria() {
        return libreria;
    }

    public Libro libreria(Libreria libreria) {
        this.libreria = libreria;
        return this;
    }

    public void setLibreria(Libreria libreria) {
        this.libreria = libreria;
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
        Libro libro = (Libro) o;
        if (libro.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), libro.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Libro{" +
            "id=" + getId() +
            ", codLibro='" + getCodLibro() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
