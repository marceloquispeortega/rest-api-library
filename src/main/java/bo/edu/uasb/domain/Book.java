package bo.edu.uasb.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import bo.edu.uasb.domain.enumeration.Language;

/**
 * A Book.
 */
@Entity
@Table(name = "book")
public class Book implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 60)
    @Column(name = "title", length = 60, nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "isbn")
    private String isbn;

    @Min(value = 2000)
    @Column(name = "jhi_year")
    private Integer year;

    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Language language;

    @ManyToMany
    @JoinTable(name = "book_author",
               joinColumns = @JoinColumn(name = "books_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "authors_id", referencedColumnName = "id"))
    private Set<Author> authors = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("books")
    private Area area;

    @ManyToOne
    @JsonIgnoreProperties("books")
    private Editorial editorial;

    @ManyToOne
    @JsonIgnoreProperties("books")
    private Country country;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Book title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Book description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIsbn() {
        return isbn;
    }

    public Book isbn(String isbn) {
        this.isbn = isbn;
        return this;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Integer getYear() {
        return year;
    }

    public Book year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Language getLanguage() {
        return language;
    }

    public Book language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Set<Author> getAuthors() {
        return authors;
    }

    public Book authors(Set<Author> authors) {
        this.authors = authors;
        return this;
    }

    public Book addAuthor(Author author) {
        this.authors.add(author);
        author.getBooks().add(this);
        return this;
    }

    public Book removeAuthor(Author author) {
        this.authors.remove(author);
        author.getBooks().remove(this);
        return this;
    }

    public void setAuthors(Set<Author> authors) {
        this.authors = authors;
    }

    public Area getArea() {
        return area;
    }

    public Book area(Area area) {
        this.area = area;
        return this;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public Editorial getEditorial() {
        return editorial;
    }

    public Book editorial(Editorial editorial) {
        this.editorial = editorial;
        return this;
    }

    public void setEditorial(Editorial editorial) {
        this.editorial = editorial;
    }

    public Country getCountry() {
        return country;
    }

    public Book country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
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
        Book book = (Book) o;
        if (book.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), book.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Book{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", isbn='" + getIsbn() + "'" +
            ", year=" + getYear() +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
