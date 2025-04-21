<?php
error_log("functions.php carregado");
add_theme_support('post-thumbnails');
add_theme_support('menus');

function createCustomPostTypeProdutos()
{
    register_post_type(
        'produtos',
        array(
            'labels' => array(
                'name' => __('Produtos'),
                'singular_name' => __('Produto'),
            ),
            'public' => true,
            'has_archive' => true,
            'show_in_rest' => true,
            'rest_base' => 'produtos',
            'rest_controller_class' => 'WP_REST_Posts_Controller',
            'rewrite' => array('slug' => 'produtos'),
            'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        )
    );
}
add_action('init', 'customRewriteRuleProdutos', 10, 0);
function customRewriteRuleProdutos()
{
    add_rewrite_rule(
        '^produtos/([^/]*)/?',
        'index.php?produtos=$matches[1]',
        'top'
    );
}

add_action('init', 'createCustomPostTypeProdutos');

function createCustomPostTypeGallery()
{
    register_post_type('gallery', [
        'labels' => [
            'name' => __('Gallery'),
            'singular_name' => __('Gallery Item'),
        ],
        'public' => true,
        'has_archive' => false,
        'show_in_rest' => true,
        'rewrite' => ['slug' => 'gallery'],
        'supports' => ['title', 'custom-fields', 'thumbnail']
    ]);
}
add_action('init', 'createCustomPostTypeGallery');

function createCustomPostTypeAppStore()
{
    register_post_type('app_store', [
        'labels' => [
            'name' => __('App Store'),
            'singular_name' => __('App Store Item'),
        ],
        'public' => true,
        'has_archive' => false,
        'show_in_rest' => true,
        'rewrite' => ['slug' => 'app_store'],
        'supports' => ['title', 'custom-fields', 'thumbnail']
    ]);
}
add_action('init', 'createCustomPostTypeAppStore');

function registerCustomTaxonomyTags()
{
    register_taxonomy(
        'produto_tags',
        'produtos',
        array(
            'label' => __('Tags'),
            'rewrite' => array('slug' => 'tags'),
            'hierarchical' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_rest' => true,
        )
    );
}

add_action('init', 'registerCustomTaxonomyTags');

function createCustomPostTypeFormularios()
{
    register_post_type('formularios', [
        'labels' => [
            'name' => __('Formulários'),
            'singular_name' => __('Formulário'),
        ],
        'public' => true,
        'has_archive' => false,
        'show_in_rest' => true,
        'rewrite' => ['slug' => 'formularios'],
        'supports' => ['title', 'custom-fields']
    ]);
}
add_action('init', 'createCustomPostTypeFormularios');

/*
    |----------------------------------------------------------
    |  CORS HEADER – libera React em http://localhost:5173
    |----------------------------------------------------------
 */
add_action('rest_api_init', function () {

    // remove o filtro padrão ‑ evita cabeçalhos duplicados
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');

    add_filter('rest_pre_serve_request', function ($value) {

        $origin = 'http://localhost:5173';

        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce');

        // pré‑flight OPTIONS deve retornar vazio + 200
        if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
            exit;
        }
        return $value;
    }, 15);
}, 15);

add_filter('post_type_link', function ($post_link, $post) {
    if ($post->post_type === 'produtos') {
        return home_url('/produtos/' . $post->post_name);
    }
    return $post_link;
}, 10, 2);

add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/enviar-formulario', [
        'methods' => 'POST',
        'callback' => 'handleFormularioSubmission',
        'permission_callback' => '__return_true',
    ]);
});

function handleFormularioSubmission($request)
{
    $data = $request->get_json_params();

    $post_id = wp_insert_post([
        'post_type' => 'formularios',
        'post_status' => 'publish',
        'meta_input' => [
            'categoria1' => sanitize_text_field($data['categoria1']),
            'categoria2' => sanitize_text_field($data['categoria2']),
            'categoria3' => sanitize_text_field($data['categoria3']),
            'categoria4' => sanitize_text_field($data['categoria4']),
        ],
    ]);

    return new WP_REST_Response(['id' => $post_id], 200);
}
