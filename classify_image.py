import sys

from imagematch.imagematch import ImageMatch

im = ImageMatch(
            limit=10,
            source_graph='imagematch/tmp/output_graph.pb',
            source_labels='imagematch/tmp/output_labels.txt'
        )

im.match(str(sys.argv[1]))

