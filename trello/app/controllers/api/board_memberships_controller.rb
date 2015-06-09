module Api
  class BoardMembershipsController < ApiController

    def index
      @board_memberships = BoardMembership.all

      render json: @board_memberships

    end

    def create
      @board_membership = BoardMembership.new(board_mem_params);

      if @board_membership.save
        render json: @board_membership
      else
        render json: @board_membership.errors.full_messages, status: :unprocessable_entity
      end
    end




    private
      def board_mem_params
        params.require(:board_membership).permit(:user_id, :board_id)
      end
  end
end
