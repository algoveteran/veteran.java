
var imagePuzzle = {
    stepCount: 0,
    pass: 1,
    images: [],
    gridSize: 6,
    startGame: function (images, gridSize) {
        this.images = images;
        this.gridSize = gridSize;
        this.setImage(images, gridSize);
        $('#playPanel').show();
        $('#sortable').randomize();
        this.enableSwapping('#sortable li');
        this.stepCount = 0;
    },
    enableSwapping: function (elem) {
        $(elem).draggable({
            snap: '#droppable',
            snapMode: 'outer',
            revert: "invalid",
            helper: "clone"
        });
        $(elem).droppable({
            drop: function (event, ui) {
                var $dragElem = $(ui.draggable).clone().replaceAll(this);
                $(this).replaceAll(ui.draggable);

                currentList = $('#sortable > li').map(function (i, el) { return $(el).attr('data-value'); });
                if (isSorted(currentList)) {
                    imagePuzzle.pass--;
                    if (imagePuzzle.pass == 0) {
                        $("#mission-panel").hide();
                        $('#gameOver').show();
                        imagePuzzle.endGame();
                    } else {
                        $("#pass").text("You have to pass " + imagePuzzle.pass + " times more.");
                        imagePuzzle.startGame(imagePuzzle.images, imagePuzzle.gridSize);
                    }
                } else {
                    imagePuzzle.stepCount++;
                    $('.stepCount').text(imagePuzzle.stepCount);
                }

                imagePuzzle.enableSwapping(this);
                imagePuzzle.enableSwapping($dragElem);
            }
        });
    },

    setImage: function (images, gridSize) {
        gridSize = gridSize || 8; // If gridSize is null or not passed, default it as 4.
        var percentage = 100 / (gridSize - 1);
        var image = images[Math.floor(Math.random() * images.length)];
//        $('#imgTitle').html(image.title);
        $('#actualImage').attr('src', '/' + image.src);
        $('#sortable').empty();
        let itemSize = $('#sortable').width() / gridSize;
        for (var i = 0; i < gridSize * gridSize; i++) {
            var xpos = (percentage * (i % gridSize)) + '%';
            var ypos = (percentage * Math.floor(i / gridSize)) + '%';
            var li = $('<li class="item" data-value="' + (i) + '"></li>').css({
                'background-image': 'url(/' + image.src + ')',
                'background-size': (gridSize * 100) + '%',
                'background-position': xpos + ' ' + ypos,
                'width': itemSize + 'px',
                'height': itemSize + 'px'
            });
            $('#sortable').append(li);
        }
        $('#sortable').randomize();
    },
    endGame: function() {}
};

function isSorted(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] != i)
            return false;
    }
    return true;
}
$.fn.randomize = function (selector) {
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function () {
        $(this).children(selector).sort(function () {
            return Math.round(Math.random()) - 0.5;
        }).remove().appendTo(this);
    });
    return this;
};