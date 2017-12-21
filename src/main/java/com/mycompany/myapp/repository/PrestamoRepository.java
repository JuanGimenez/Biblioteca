package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Prestamo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Prestamo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrestamoRepository extends JpaRepository<Prestamo, Long> {

}
