# == Schema Information
#
# Table name: playlists
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  creater_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Playlist < ApplicationRecord 
    validates :title, presence: true
    validates :creater_id, presence: true

    has_many :tracks,
    foreign_key: :track_id,
    class_name: :PlaylistTracks

    belongs_to :creater,
    foreign_key: :creater_id,
    class_name: :User
end
