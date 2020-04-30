const { Post } = require("../controllers/Post");
const { User } = require("../controllers/User");
const { Comment } = require("../controllers/Comment");

const commentResolvers = {
    Query: {
        getComments: () => Comment.all(),
        getComment: (parent, args, context, info) =>  {
            return Comment.findById( args.id )
        }
    },
    Mutation: { 
        async addComment( parent, args, context, info) {
            const comment = await Comment.createComment({ postId: args.postId, content: args.content, authorId: context.user.id });
            await User.addCommentId(comment.id, context.user.id);
            await Post.addCommentId(comment.id, args.postId)
            return comment;
        }
    }
}

module.exports = {
    commentResolvers
}