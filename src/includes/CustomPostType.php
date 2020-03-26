<?php

namespace CWP\GutenbergForms;

class CustomPostType {

	private $identifier = 'cwp_forms_submission';

	private $args = [
		'icon' 					=> 'email-alt',
		'supports'              => array( 'title', 'editor' ),
		'hierarchical'          => false,
		'public'                => false,
		'show_ui'               => false,
		'show_in_menu'          => false,
		'show_in_admin_bar'     => false,
		'show_in_nav_menus'     => false,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => true,
		'publicly_queryable'    => false,
		'capability_type'       => 'page',
		'show_in_rest'          => false,
	];

	public function __construct() {
		$this->args[ 'description' ] = __( 'Post Type Description' );
		$this->args[ 'label' ] = __( 'Gutenberg Forms Submission' );
		$this->args[ 'labels' ] = [
			'name' => __( 'Gutenberg Forms' ),
			'singular_name' => __( 'Gutenberg Forms Submission' ),
		];
	}

	public function init() {
		add_action( 'init', [ $this, 'register' ] );
	}

	/**
	 * Register the CPT within WordPress
	 */
	public function register() {
		register_post_type( $this->identifier, $this->args );
	}

}
