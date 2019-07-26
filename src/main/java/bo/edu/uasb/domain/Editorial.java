package bo.edu.uasb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Editorial.
 */
@Entity
@Table(name = "editorial")
public class Editorial implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 60)
    @Column(name = "name", length = 60, nullable = false)
    private String name;

    @Size(min = 1, max = 60)
    @Column(name = "address", length = 60)
    private String address;

    @OneToMany(mappedBy = "editorial")
    private Set<Book> books = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Editorial name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Editorial address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public Editorial books(Set<Book> books) {
        this.books = books;
        return this;
    }

    public Editorial addBook(Book book) {
        this.books.add(book);
        book.setEditorial(this);
        return this;
    }

    public Editorial removeBook(Book book) {
        this.books.remove(book);
        book.setEditorial(null);
        return this;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
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
        Editorial editorial = (Editorial) o;
        if (editorial.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), editorial.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Editorial{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            "}";
    }
}
