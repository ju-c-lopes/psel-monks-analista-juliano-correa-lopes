<?php get_header(); ?>

<h1>Projetos</h1>

<?php if (have_posts()) : ?>
    <ul>
        <?php while (have_posts()) : the_post(); ?>
            <li>
                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            </li>
        <?php endwhile; ?>
    </ul>
<?php else : ?>
    <p>Nenhum projeto encontrado.</p>
<?php endif; ?>

<?php get_footer(); ?>
