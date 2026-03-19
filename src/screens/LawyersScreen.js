import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const lawyers = [
  {
    id: "1",
    name: "Adaeze Okonkwo",
    specialty: "Employment Law",
    state: "Lagos",
    experience: "8 years",
    fee: "₦15,000/hr",
    phone: "+234 801 234 5678",
    available: true,
  },
  {
    id: "2",
    name: "Emeka Nwosu",
    specialty: "Property & Land Law",
    state: "Abuja",
    experience: "12 years",
    fee: "₦20,000/hr",
    phone: "+234 802 345 6789",
    available: true,
  },
  {
    id: "3",
    name: "Fatima Aliyu",
    specialty: "Family Law",
    state: "Kano",
    experience: "6 years",
    fee: "₦10,000/hr",
    phone: "+234 803 456 7890",
    available: false,
  },
  {
    id: "4",
    name: "Chukwuemeka Obi",
    specialty: "Criminal Law",
    state: "Lagos",
    experience: "15 years",
    fee: "₦25,000/hr",
    phone: "+234 804 567 8901",
    available: true,
  },
  {
    id: "5",
    name: "Ngozi Eze",
    specialty: "Business & Corporate",
    state: "Port Harcourt",
    experience: "10 years",
    fee: "₦18,000/hr",
    phone: "+234 805 678 9012",
    available: true,
  },
  {
    id: "6",
    name: "Ibrahim Musa",
    specialty: "Tenancy & Housing",
    state: "Abuja",
    experience: "7 years",
    fee: "₦12,000/hr",
    phone: "+234 806 789 0123",
    available: false,
  },
  {
    id: "7",
    name: "Blessing Okafor",
    specialty: "Employment Law",
    state: "Enugu",
    experience: "5 years",
    fee: "₦8,000/hr",
    phone: "+234 807 890 1234",
    available: true,
  },
  {
    id: "8",
    name: "Tunde Adeyemi",
    specialty: "Criminal Law",
    state: "Ibadan",
    experience: "20 years",
    fee: "₦30,000/hr",
    phone: "+234 808 901 2345",
    available: true,
  },
];

const states = [
  "All",
  "Lagos",
  "Abuja",
  "Kano",
  "Port Harcourt",
  "Enugu",
  "Ibadan",
];
const specialties = [
  "All",
  "Employment Law",
  "Property & Land Law",
  "Family Law",
  "Criminal Law",
  "Business & Corporate",
  "Tenancy & Housing",
];

export default function LawyersScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  // Filter lawyers based on search, state and specialty
  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch =
      lawyer.name.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesState =
      selectedState === "All" || lawyer.state === selectedState;
    const matchesSpecialty =
      selectedSpecialty === "All" || lawyer.specialty === selectedSpecialty;
    return matchesSearch && matchesState && matchesSpecialty;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find a Lawyer</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Search bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or specialty..."
            placeholderTextColor="#64748B"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* State filter */}
        <Text style={styles.filterLabel}>Filter by State</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {states.map((state) => (
            <TouchableOpacity
              key={state}
              style={[
                styles.filterChip,
                selectedState === state && styles.filterChipActive,
              ]}
              onPress={() => setSelectedState(state)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedState === state && styles.filterChipTextActive,
                ]}
              >
                {state}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Specialty filter */}
        <Text style={styles.filterLabel}>Filter by Specialty</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {specialties.map((spec) => (
            <TouchableOpacity
              key={spec}
              style={[
                styles.filterChip,
                selectedSpecialty === spec && styles.filterChipActive,
              ]}
              onPress={() => setSelectedSpecialty(spec)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedSpecialty === spec && styles.filterChipTextActive,
                ]}
              >
                {spec}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results count */}
        <Text style={styles.resultsCount}>
          {filteredLawyers.length} lawyer
          {filteredLawyers.length !== 1 ? "s" : ""} found
        </Text>

        {/* Lawyers list */}
        {filteredLawyers.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>👨‍⚖️</Text>
            <Text style={styles.emptyTitle}>No lawyers found</Text>
            <Text style={styles.emptyDesc}>
              Try adjusting your search or filters
            </Text>
          </View>
        ) : (
          filteredLawyers.map((lawyer) => (
            <View key={lawyer.id} style={styles.lawyerCard}>
              {/* Top row */}
              <View style={styles.lawyerTop}>
                <View style={styles.lawyerAvatar}>
                  <Text style={styles.lawyerAvatarText}>
                    {lawyer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Text>
                </View>
                <View style={styles.lawyerInfo}>
                  <Text style={styles.lawyerName}>{lawyer.name}</Text>
                  <Text style={styles.lawyerSpecialty}>{lawyer.specialty}</Text>
                  <Text style={styles.lawyerLocation}>📍 {lawyer.state}</Text>
                </View>
                <View
                  style={[
                    styles.availableBadge,
                    !lawyer.available && styles.unavailableBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.availableText,
                      !lawyer.available && styles.unavailableText,
                    ]}
                  >
                    {lawyer.available ? "Available" : "Busy"}
                  </Text>
                </View>
              </View>

              {/* Details row */}
              <View style={styles.lawyerDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Experience</Text>
                  <Text style={styles.detailValue}>{lawyer.experience}</Text>
                </View>
                <View style={styles.detailDivider} />
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Consultation</Text>
                  <Text style={styles.detailValue}>{lawyer.fee}</Text>
                </View>
              </View>

              {/* Contact button */}
              <TouchableOpacity
                style={[
                  styles.contactBtn,
                  !lawyer.available && styles.contactBtnDisabled,
                ]}
                disabled={!lawyer.available}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.contactBtnText,
                    !lawyer.available && styles.contactBtnTextDisabled,
                  ]}
                >
                  {lawyer.available
                    ? `📞 ${lawyer.phone}`
                    : "Currently Unavailable"}
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        {/* Note */}
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            📌 LexBot does not endorse specific lawyers. Always verify
            credentials independently before engaging legal services.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0F1E",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1E2D45",
  },
  backBtn: {
    width: 32,
    padding: 4,
  },
  backText: {
    fontSize: 24,
    color: "#C8922A",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#F1F5F9",
  },
  container: {
    padding: 20,
    gap: 14,
  },
  searchBar: {
    backgroundColor: "#1A2235",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#1E2D45",
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#F1F5F9",
  },
  clearBtn: {
    color: "#64748B",
    fontSize: 14,
    padding: 4,
  },
  filterLabel: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  filterRow: {
    gap: 8,
    paddingBottom: 4,
  },
  filterChip: {
    backgroundColor: "#1A2235",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#1E2D45",
  },
  filterChipActive: {
    backgroundColor: "#C8922A",
    borderColor: "#C8922A",
  },
  filterChipText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },
  filterChipTextActive: {
    color: "#fff",
  },
  resultsCount: {
    fontSize: 12,
    color: "#64748B",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
    gap: 8,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F1F5F9",
  },
  emptyDesc: {
    fontSize: 13,
    color: "#64748B",
  },
  lawyerCard: {
    backgroundColor: "#1A2235",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1E2D45",
    gap: 14,
  },
  lawyerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  lawyerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(200, 146, 42, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(200, 146, 42, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  lawyerAvatarText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#C8922A",
  },
  lawyerInfo: {
    flex: 1,
    gap: 3,
  },
  lawyerName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F1F5F9",
  },
  lawyerSpecialty: {
    fontSize: 12,
    color: "#C8922A",
    fontWeight: "600",
  },
  lawyerLocation: {
    fontSize: 12,
    color: "#64748B",
  },
  availableBadge: {
    backgroundColor: "rgba(34, 197, 94, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.3)",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  unavailableBadge: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  availableText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#22C55E",
  },
  unavailableText: {
    color: "#EF4444",
  },
  lawyerDetails: {
    flexDirection: "row",
    backgroundColor: "#0A0F1E",
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  detailItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  detailLabel: {
    fontSize: 10,
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#F1F5F9",
  },
  detailDivider: {
    width: 1,
    backgroundColor: "#1E2D45",
  },
  contactBtn: {
    backgroundColor: "#C8922A",
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
    elevation: 4,
  },
  contactBtnDisabled: {
    backgroundColor: "#1A2235",
    elevation: 0,
  },
  contactBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  contactBtnTextDisabled: {
    color: "#64748B",
  },
  noteBox: {
    backgroundColor: "rgba(200, 146, 42, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(200, 146, 42, 0.2)",
    borderRadius: 12,
    padding: 14,
  },
  noteText: {
    fontSize: 12,
    color: "#E5B04A",
    lineHeight: 18,
  },
});
