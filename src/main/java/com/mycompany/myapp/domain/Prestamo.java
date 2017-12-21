package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Prestamo.
 */
@Entity
@Table(name = "prestamo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Prestamo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "codigo_prestamo", nullable = false)
    private String codigoPrestamo;

    @Column(name = "fecha_prestado")
    private ZonedDateTime fechaPrestado;

    @Column(name = "fechas_devuelto")
    private ZonedDateTime fechasDevuelto;

    @ManyToOne
    private Libro libro;

    @ManyToOne
    private Empleado empleado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoPrestamo() {
        return codigoPrestamo;
    }

    public Prestamo codigoPrestamo(String codigoPrestamo) {
        this.codigoPrestamo = codigoPrestamo;
        return this;
    }

    public void setCodigoPrestamo(String codigoPrestamo) {
        this.codigoPrestamo = codigoPrestamo;
    }

    public ZonedDateTime getFechaPrestado() {
        return fechaPrestado;
    }

    public Prestamo fechaPrestado(ZonedDateTime fechaPrestado) {
        this.fechaPrestado = fechaPrestado;
        return this;
    }

    public void setFechaPrestado(ZonedDateTime fechaPrestado) {
        this.fechaPrestado = fechaPrestado;
    }

    public ZonedDateTime getFechasDevuelto() {
        return fechasDevuelto;
    }

    public Prestamo fechasDevuelto(ZonedDateTime fechasDevuelto) {
        this.fechasDevuelto = fechasDevuelto;
        return this;
    }

    public void setFechasDevuelto(ZonedDateTime fechasDevuelto) {
        this.fechasDevuelto = fechasDevuelto;
    }

    public Libro getLibro() {
        return libro;
    }

    public Prestamo libro(Libro libro) {
        this.libro = libro;
        return this;
    }

    public void setLibro(Libro libro) {
        this.libro = libro;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public Prestamo empleado(Empleado empleado) {
        this.empleado = empleado;
        return this;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
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
        Prestamo prestamo = (Prestamo) o;
        if (prestamo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), prestamo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Prestamo{" +
            "id=" + getId() +
            ", codigoPrestamo='" + getCodigoPrestamo() + "'" +
            ", fechaPrestado='" + getFechaPrestado() + "'" +
            ", fechasDevuelto='" + getFechasDevuelto() + "'" +
            "}";
    }
}
