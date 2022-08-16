<?php
$post = get_post($_GET['post'] ?? 0);
if (null !== $post) {
    ?>
    <div class="col-8">
        <div class="alert alert-warning mb-3 d-none" id="response-error" role="alert"></div>
        <h3>Edit: <?= $post->post_title ?></h3>

        <form id="edit-form" onsubmit="insertPost(event)">
            <input type="hidden" name="ID" value="<?= $post->ID ?>">

            <div class="form-group mb-2">
                <label for="title">Post title</label>
                <input type="text" class="form-control" id="title" name="post_title"
                       value="<?= $post->post_title ?>">
            </div>
            <div class="form-group mb-2">
                <label for="content">Post content</label>
                <textarea class="form-control" id="content" name="post_content"><?= $post->post_content ?></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
        </form>
    </div>
<?php
} else { ?>
    <div class="col-12">
        <h2 class="text-center">Invalid post data</h2>
    </div>
<?php } ?>
