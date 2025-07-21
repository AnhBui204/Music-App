import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Button,
  Card,
  Chip,
  Dialog,
  IconButton,
  Paragraph,
  Portal,
  Text,
  TextInput
} from 'react-native-paper';
import AdminMusicService, { Song } from '../../services/AdminMusicService';

interface SongWithCategory extends Song {
  category: string;
}

export default function AdminMusicScreen() {
  const [songs, setSongs] = useState<SongWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSong, setEditingSong] = useState<SongWithCategory | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [songToDelete, setSongToDelete] = useState<SongWithCategory | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState<SongWithCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    image: '',
    audioUrl: '',
    duration: '',
    genre: '',
    category: 'recommended'
  });

  const categories = [
    { label: 'Đề xuất', value: 'recommended' },
    { label: 'Mới phát hành', value: 'newReleases' },
    { label: 'Xu hướng', value: 'trending' },
    { label: 'Phổ biến', value: 'popular' }
  ];

  const filterCategories = [
    { label: 'Tất cả', value: 'all' },
    ...categories
  ];

  useEffect(() => {
    checkAdminPermission();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadSongs();
    }
  }, [isAdmin]);

  const checkAdminPermission = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setCurrentUser(parsedUser);
        // Kiểm tra xem user có phải admin không (username = admin hoặc id = 1)
        if (parsedUser.username === 'admin' || parsedUser.id === '1') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.log('Check admin error:', error);
      setIsAdmin(false);
    }
    setLoading(false);
  };

  const loadSongs = async () => {
    setLoading(true);
    const result = await AdminMusicService.getAllSongs();
    if (result.success && result.data) {
      setSongs(result.data);
      // Apply current filters when data is loaded
      applyFilters(searchQuery, selectedCategory);
    } else {
      Alert.alert('Lỗi', result.error || 'Không thể tải danh sách bài hát');
    }
    setLoading(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    applyFilters(searchQuery, category);
  };

  const applyFilters = (query: string, category: string) => {
    let filtered = songs;

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(song => song.category === category);
    }

    // Filter by search query
    if (query.trim() !== '') {
      filtered = filtered.filter(song => 
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.genre?.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredSongs(filtered);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      artist: '',
      image: '',
      audioUrl: '',
      duration: '',
      genre: '',
      category: 'recommended'
    });
    setEditingSong(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (song: SongWithCategory) => {
    setFormData({
      title: song.title,
      artist: song.artist,
      image: song.image,
      audioUrl: song.audioUrl,
      duration: song.duration || '',
      genre: song.genre || '',
      category: song.category
    });
    setEditingSong(song);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.artist || !formData.image || !formData.audioUrl) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }

    const songData: Song = {
      title: formData.title,
      artist: formData.artist,
      image: formData.image,
      audioUrl: formData.audioUrl,
      duration: formData.duration,
      genre: formData.genre
    };

    let result;
    if (editingSong) {
      result = await AdminMusicService.updateSong(editingSong.id!, songData, formData.category);
    } else {
      result = await AdminMusicService.addSong(songData, formData.category);
    }

    if (result.success) {
      Alert.alert('Thành công', editingSong ? 'Cập nhật bài hát thành công' : 'Thêm bài hát thành công');
      setShowModal(false);
      loadSongs();
      resetForm();
    } else {
      Alert.alert('Lỗi', result.error);
    }
  };

  const confirmDelete = (song: SongWithCategory) => {
    setSongToDelete(song);
    setDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!songToDelete) return;

    const result = await AdminMusicService.deleteSong(songToDelete.id!, songToDelete.category);
    if (result.success) {
      Alert.alert('Thành công', 'Xóa bài hát thành công');
      loadSongs();
    } else {
      Alert.alert('Lỗi', result.error);
    }
    setDeleteDialog(false);
    setSongToDelete(null);
  };

  const getCategoryLabel = (category: string) => {
    return categories.find(cat => cat.value === category)?.label || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      recommended: '#1DB954',
      newReleases: '#1E88E5',
      trending: '#FF9800',
      popular: '#E91E63'
    };
    return colors[category] || '#666';
  };

  // Function để get ảnh từ assets theo tên file
  const getImageSource = (imageName: string) => {
    // Danh sách tất cả ảnh có trong assets
    switch (imageName) {
      case '3107.png':
        return require('../../assets/images/3107.png');
      case 'anhdalacvao.png':
        return require('../../assets/images/anhdalacvao.png');
      case 'ballad.png':
        return require('../../assets/images/ballad.png');
      case 'bentrentanglau.png':
        return require('../../assets/images/bentrentanglau.png');
      case 'cafe.png':
        return require('../../assets/images/cafe.png');
      case 'cd_disk.png':
        return require('../../assets/images/cd_disk.png');
      case 'cd_disk1.png':
        return require('../../assets/images/cd_disk1.png');
      case 'cd_disk2.png':
        return require('../../assets/images/cd_disk2.png');
      case 'chayvekhovoianh.png':
        return require('../../assets/images/chayvekhovoianh.png');
      case 'chimsau.png':
        return require('../../assets/images/chimsau.png');
      case 'coem.png':
        return require('../../assets/images/coem.png');
      case 'cover.png':
        return require('../../assets/images/cover.png');
      case 'cover1.png':
        return require('../../assets/images/cover1.png');
      case 'emgioi.png':
        return require('../../assets/images/emgioi.png');
      case 'emla.png':
        return require('../../assets/images/emla.png');
      case 'ghequa.png':
        return require('../../assets/images/ghequa.png');
      case 'grey.png':
        return require('../../assets/images/grey.png');
      case 'hong.png':
        return require('../../assets/images/hong.png');
      case 'khunglong.png':
        return require('../../assets/images/khunglong.png');
      case 'lalung.png':
        return require('../../assets/images/lalung.png');
      case 'lunglo.png':
        return require('../../assets/images/lunglo.png');
      case 'motdem.png':
        return require('../../assets/images/motdem.png');
      case 'mtp.png':
        return require('../../assets/images/mtp.png');
      case 'nal.png':
        return require('../../assets/images/nal.png');
      case 'neulucdo.png':
        return require('../../assets/images/neulucdo.png');
      case 'phiasau.png':
        return require('../../assets/images/phiasau.png');
      case 'remix.png':
        return require('../../assets/images/remix.png');
      case 'ruou.png':
        return require('../../assets/images/ruou.png');
      case 'saigondaulongqua.png':
        return require('../../assets/images/saigondaulongqua.png');
      case 'seetinh.png':
        return require('../../assets/images/seetinh.png');
      case 'simplelove.png':
        return require('../../assets/images/simplelove.png');
      case 'tet.png':
        return require('../../assets/images/tet.png');
      case 'thichemhoinhieu.png':
        return require('../../assets/images/thichemhoinhieu.png');
      case 'traochoanh.png':
        return require('../../assets/images/traochoanh.png');
      case 'truylung.png':
        return require('../../assets/images/truylung.png');
      case 'tung.png':
        return require('../../assets/images/tung.png');
      case 'tutinh.png':
        return require('../../assets/images/tutinh.png');
      case 'vietnam-top.png':
        return require('../../assets/images/vietnam-top.png');
      case 'yeu5.png':
        return require('../../assets/images/yeu5.png');
      case 'yeuladay.png':
        return require('../../assets/images/yeuladay.png');
      default:
        return require('../../assets/images/cover.png');
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Đang kiểm tra quyền...</Text>
      </View>
    );
  }

  if (!isAdmin) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="shield-checkmark-outline" size={80} color="#666" />
        <Text style={styles.noAccessTitle}>Không có quyền truy cập</Text>
        <Text style={styles.noAccessText}>
          Chỉ admin mới có thể truy cập trang này.
        </Text>
        <Text style={styles.noAccessText}>
          Vui lòng đăng nhập bằng tài khoản admin.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Quản lý nhạc</Text>
          {currentUser && (
            <Text style={styles.adminInfo}>Admin: {currentUser.name || currentUser.username}</Text>
          )}
        </View>
        <Button
          mode="contained"
          onPress={openAddModal}
          icon="plus"
          style={styles.addButton}
        >
          Thêm bài hát
        </Button>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Tìm kiếm bài hát..."
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchInput}
          mode="outlined"
          left={<TextInput.Icon icon="magnify" />}
        />
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Lọc theo danh mục:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilter}>
          {filterCategories.map((cat) => (
            <Chip
              key={cat.value}
              selected={selectedCategory === cat.value}
              onPress={() => handleCategoryFilter(cat.value)}
              style={[
                styles.filterChip,
                selectedCategory === cat.value && styles.filterChipSelected
              ]}
              textStyle={[
                styles.filterChipText,
                selectedCategory === cat.value && styles.filterChipTextSelected
              ]}
            >
              {cat.label}
            </Chip>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          {filteredSongs.map((song) => (
            <Card key={`${song.category}-${song.id}`} style={styles.songCard}>
              <View style={styles.cardHeader}>
                <Image 
                  source={getImageSource(song.image)} 
                  style={styles.songImage}
                  defaultSource={require('../../assets/images/cover.png')}
                  resizeMode="cover"
                  onError={() => console.log('Image load error:', song.image)}
                />
                <View style={styles.cardActions}>
                  <IconButton
                    icon="pencil"
                    size={18}
                    iconColor="#4CAF50"
                    onPress={() => openEditModal(song)}
                    style={styles.actionButton}
                  />
                  <IconButton
                    icon="delete"
                    size={18}
                    iconColor="#F44336"
                    onPress={() => confirmDelete(song)}
                    style={styles.actionButton}
                  />
                </View>
              </View>
              
              <View style={styles.cardContent}>
                <Text style={styles.songTitle} numberOfLines={2}>{song.title}</Text>
                <Text style={styles.songArtist} numberOfLines={1}>{song.artist}</Text>
                
                <View style={styles.songDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="time-outline" size={14} color="#666" />
                    <Text style={styles.detailText}>{song.duration || 'N/A'}</Text>
                  </View>
                  
                  {song.genre && (
                    <View style={styles.detailRow}>
                      <Ionicons name="musical-notes-outline" size={14} color="#666" />
                      <Text style={styles.detailText} numberOfLines={1}>{song.genre}</Text>
                    </View>
                  )}
                </View>
                
                <Chip
                  style={[styles.categoryChip, { backgroundColor: getCategoryColor(song.category) }]}
                  textStyle={styles.categoryText}
                  compact
                >
                  {getCategoryLabel(song.category)}
                </Chip>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* Modal thêm/sửa */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderContent}>
                <Ionicons 
                  name={editingSong ? "pencil" : "add-circle"} 
                  size={24} 
                  color="#1DB954" 
                />
                <Text style={styles.modalTitle}>
                  {editingSong ? 'Chỉnh sửa bài hát' : 'Thêm bài hát mới'}
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => setShowModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.form} 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.formContent}
            >
              {/* Basic Information Section */}
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
                <View style={styles.sectionContent}>
                  <TextInput
                    label="Tên bài hát"
                    value={formData.title}
                    onChangeText={(text) => setFormData({...formData, title: text})}
                    style={styles.input}
                    mode="outlined"
                    theme={{
                      colors: {
                        primary: '#1DB954',
                        outline: '#1DB954',
                        onSurface: '#fff',
                        onSurfaceVariant: '#aaa',
                        surface: '#2a2a2a'
                      }
                    }}
                    textColor="#fff"
                    left={<TextInput.Icon icon="music-note" />}
                  />

                  <TextInput
                    label="Nghệ sĩ"
                    value={formData.artist}
                    onChangeText={(text) => setFormData({...formData, artist: text})}
                    style={styles.input}
                    mode="outlined"
                    theme={{
                      colors: {
                        primary: '#1DB954',
                        outline: '#1DB954',
                        onSurface: '#fff',
                        onSurfaceVariant: '#aaa',
                        surface: '#2a2a2a'
                      }
                    }}
                    textColor="#fff"
                    left={<TextInput.Icon icon="account-music" />}
                  />

                </View>
              </View>

              {/* File Information Section */}
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Tệp tin</Text>
                <View style={styles.sectionContent}>
                  <TextInput
                    label="Tên file audio"
                    value={formData.audioUrl}
                    onChangeText={(text) => setFormData({...formData, audioUrl: text})}
                    style={styles.input}
                    mode="outlined"
                    placeholder="song.mp3"
                    theme={{
                      colors: {
                        primary: '#1DB954',
                        outline: '#1DB954',
                        onSurface: '#fff',
                        onSurfaceVariant: '#aaa',
                        surface: '#2a2a2a'
                      }
                    }}
                    textColor="#fff"
                    left={<TextInput.Icon icon="file-music" />}
                  />

                  <TextInput
                    label="Tên file ảnh"
                    value={formData.image}
                    onChangeText={(text) => setFormData({...formData, image: text})}
                    style={styles.input}
                    mode="outlined"
                    placeholder="cover.png"
                    theme={{
                      colors: {
                        primary: '#1DB954',
                        outline: '#1DB954',
                        onSurface: '#fff',
                        onSurfaceVariant: '#aaa',
                        surface: '#2a2a2a'
                      }
                    }}
                    textColor="#fff"
                    left={<TextInput.Icon icon="image" />}
                  />
                </View>
              </View>

              {/* Category Section */}
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Danh mục</Text>
                <View style={styles.sectionContent}>
                  <View style={styles.categoryGrid}>
                    {categories.map((cat) => (
                      <TouchableOpacity
                        key={cat.value}
                        onPress={() => setFormData({...formData, category: cat.value})}
                        style={[
                          styles.categoryCardLarge,
                          formData.category === cat.value && styles.categoryCardLargeSelected
                        ]}
                      >
                        <View style={[
                          styles.categoryIconLarge,
                          { backgroundColor: getCategoryColor(cat.value) },
                          formData.category === cat.value && styles.categoryIconLargeSelected
                        ]}>
                          <Ionicons 
                            name={
                              cat.value === 'recommended' ? 'star' :
                              cat.value === 'newReleases' ? 'sparkles' :
                              cat.value === 'trending' ? 'trending-up' : 'heart'
                            } 
                            size={24} 
                            color="#fff" 
                          />
                        </View>
                        <Text style={[
                          styles.categoryCardLargeText,
                          formData.category === cat.value && styles.categoryCardLargeTextSelected
                        ]}>
                          {cat.label}
                        </Text>
                        {formData.category === cat.value && (
                          <View style={styles.selectedIndicatorLarge}>
                            <Ionicons name="checkmark-circle" size={20} color="#fff" />
                          </View>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Hủy bỏ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                style={styles.saveButton}
              >
                <Ionicons 
                  name={editingSong ? "checkmark" : "add"} 
                  size={20} 
                  color="#fff" 
                  style={styles.saveButtonIcon}
                />
                <Text style={styles.saveButtonText}>
                  {editingSong ? 'Cập nhật' : 'Thêm mới'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Dialog xác nhận xóa */}
      <Portal>
        <Dialog visible={deleteDialog} onDismiss={() => setDeleteDialog(false)}>
          <Dialog.Title>Xác nhận xóa</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Bạn có chắc chắn muốn xóa bài hát &quot;{songToDelete?.title}&quot;?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialog(false)}>Hủy</Button>
            <Button onPress={handleDelete}>Xóa</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  noAccessTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  noAccessText: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  adminInfo: {
    fontSize: 14,
    color: '#1DB954',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#1DB954',
    borderRadius: 14,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#121212',
  },
  searchInput: {
    backgroundColor: '#1e1e1e',
    borderRadius: 14,
  },
  filterContainer: {
    padding: 16,
    paddingTop: 8,
    backgroundColor: '#121212',
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e1e',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  categoryFilter: {
    flexDirection: 'row',
  },
  filterChip: {
    marginRight: 12,
    backgroundColor: '#1e1e1e',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 20,
  },
  filterChipSelected: {
    backgroundColor: '#1DB954',
    borderColor: '#1DB954',
  },
  filterChipText: {
    color: '#aaa',
    fontSize: 12,
    fontWeight: '600',
  },
  filterChipTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  songCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#1e1e1e',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 0,
  },
  cardHeader: {
    position: 'relative',
  },
  songImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#333',
  },
  cardActions: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    backgroundColor: 'rgba(30,30,30,0.9)',
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  actionButton: {
    margin: 0,
    backgroundColor: 'transparent',
  },
  cardContent: {
    padding: 10,
  },
  songInfo: {
    flex: 1,
    marginLeft: 12,
  },
  songTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
    lineHeight: 18,
  },
  songArtist: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 8,
  },
  songDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 11,
    color: '#aaa',
    marginLeft: 6,
    flex: 1,
  },
  songDuration: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    height: '85%',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#2a2a2a',
  },
  modalHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 12,
    flex: 1,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  formContent: {
    padding: 16,
    paddingBottom: 20,
  },
  formSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1DB954',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    gap: 0,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    fontSize: 16,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: '#333',
    minWidth: 120,
  },
  categoryCardLarge: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 12,
    borderWidth: 2,
    borderColor: '#333',
    width: '48%',
    alignItems: 'center',
    position: 'relative',
    minHeight: 80,
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryCardSelected: {
    backgroundColor: '#1DB954',
    borderColor: '#1DB954',
    transform: [{ scale: 1.02 }],
  },
  categoryCardLargeSelected: {
    backgroundColor: '#1a4d2e',
    borderColor: '#1DB954',
    borderWidth: 3,
    transform: [{ scale: 1.02 }],
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoryIconLarge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  categoryIconLargeSelected: {
    transform: [{ scale: 1.1 }],
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
  },
  categoryCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  categoryCardLargeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCardTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  categoryCardLargeTextSelected: {
    color: '#1DB954',
    fontWeight: '800',
  },
  selectedIndicatorLarge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#1DB954',
    borderRadius: 12,
    padding: 2,
  },
  categoryOption: {
    marginBottom: 8,
    backgroundColor: '#444',
    borderRadius: 12,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#1DB954',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonIcon: {
    marginRight: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
