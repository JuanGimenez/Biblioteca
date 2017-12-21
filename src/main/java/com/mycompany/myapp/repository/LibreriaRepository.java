package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Libreria;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Libreria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LibreriaRepository extends JpaRepository<Libreria, Long> {

}
