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

    has_many :playlist_tracks,
    foreign_key: :playlist_id,
    class_name: :PlaylistTrack,
    dependent: :destroy

    has_many :tracks,
    through: :playlist_tracks,
    source: :track

    belongs_to :creater,
    foreign_key: :creater_id,
    class_name: :User
    
    has_one_attached :image

end
